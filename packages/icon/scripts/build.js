'use strict';
const async = require('async');
const fs = require('fs');
const glob = require('glob');
const SVGO = require('svgo');
const cheerio = require('cheerio');
const { htmlToHs } = require('html-to-hyperscript');
const { assocPath, identity } = require('ramda');
const mustache = require('mustache');

const svgo = new SVGO({});

async function exec() {
  const data = await glob.sync('src/*.svg');
  const result = await Promise.all(
    data.map(async file => {
      const content = fs.readFileSync(file).toString('utf8');
      const source = await svgo.optimize(content);
      const $ = cheerio.load(source.data.toString('utf8'), {
        decodeEntities: false,
      });

      $('style,title,defs').remove();
      $('[id]:not(symbol)').removeAttr('id');
      $('[class^="st"],[class^="cls"]').removeAttr('class');
      $('[style]:not(svg)').removeAttr('style');
      $('[data-name]').removeAttr('data-name');
      $('svg[id]').removeAttr('id');
      $('[fill]').removeAttr('fill');

      const key = file
        .split('/')
        .pop()
        .split('.')
        .shift();
      const value = htmlToHs({
        tabSize: 2,
        attributesSelector: item => {
          switch (item.name) {
            case 'id':
              return identity;
            case 'fill':
              return identity;
            case 'className':
              return identity;
            default:
              return assocPath(['attrs', item.name], item.value);
          }
        },
        syntax: 'h',
      })($.xml())
        .replace(/^`/, '')
        .replace(/`$/, '');

      return { key, value };
    }),
  );

  fs.writeFileSync(
    'dist/index.ts',
    mustache.render(fs.readFileSync('./templates/snabbdom.mustache').toString(), {
      keys: result.map(({ key }) => key),
      icons: result,
    }),
  );
}

exec();
