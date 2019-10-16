const fs = require('fs');
const { resolve } = require('path');
const glob = require('glob');
const chokidar = require('chokidar');
const R = require('ramda');
const argv = require('yargs').argv;

const watch = !!argv.watch;

const TARGET_FILES = {
  core: glob.sync(resolve(__dirname, '../../core/src/scripts/{components,drivers,hooks,modules}/**/*.ts')),
  app: glob.sync(resolve(__dirname, '../../app/src/scripts/{components,drivers,hooks,modules}/**/*.ts')),
};

function generateCode(result) {
  return `/* eslint:disable */

/**
 * Auto generated code. DO NOT EDIT. 🙅‍
 */
export default ${JSON.stringify(result, null, 2)} as any;`;
}

function extract(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const code = data.match(/export function example\([\s\S]*$/);
  return {
    type: filePath.match(/src\/scripts\/(.*?)\//)[1],
    name: filePath
      .split('/')
      .slice(-1)[0]
      .replace(/(Component|Driver|Hook|Module).(ts|tsx)/, ''),
    code: code && code[0],
  };
}

function exec(e) {
  if (e && e !== 'modified') return;
  const result = R.map(
    workspace => R.groupBy(({ type }) => type, workspace.map(extract).filter(({ code }) => !!code)),
    TARGET_FILES,
  );
  const code = generateCode(result);
  fs.writeFileSync(resolve(__dirname, '../src/scripts/constants/ExampleSpec.ts'), code);
}

exec();
watch && chokidar.watch([...TARGET_FILES['core'], ...TARGET_FILES['app']]).on('raw', exec);
