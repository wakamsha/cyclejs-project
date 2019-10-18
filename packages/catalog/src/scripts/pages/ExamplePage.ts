import { BorderRadius, Color, FontFamily, FontSize, LineHeight } from '@cyclejs-project/core/constants/VO';
import { SiAll, SoAll } from '../drivers/interface';
import { VNode, div, h1, header, section, small } from '@cycle/dom';
import { css } from 'emotion';
import { examples } from '../constants/Examples';
import { gutter } from '@cyclejs-project/core/helpers/Style';
import isolate from '@cycle/isolate';
import xs, { Stream } from 'xstream';

type Params = {
  workspace: string;
  category: string;
  type: string;
  name: string;
};

const baseStyle = css({
  display: 'flex',
  width: 'calc(100vw - 272px)',
  height: '100vh',
});

const titleStyle = css({
  marginBottom: gutter(4),
  small: {
    display: 'inline-block',
    marginBottom: gutter(1),
    fontFamily: FontFamily.Monospace,
    fontSize: FontSize.Small,
  },
  h1: {
    margin: 0,
    fontSize: 24,
    lineHeight: LineHeight.Regular,
    whiteSpace: 'nowrap',
  },
});

const previewStyle = css({
  overflow: 'auto',
  flex: '1 0 50%',
});

const previewInnerStyle = css({
  padding: `${gutter(2)} ${gutter(3)}`,
  hr: {
    margin: '2em 0',
  },
  h3: {
    marginTop: '2em',
  },
  pre: {
    display: 'block',
    maxWidth: '100%',
    margin: `${gutter(3)} 0`,
    padding: gutter(2),
    overflow: 'auto',
    border: `1px solid ${Color.LineDefault}`,
    borderRadius: BorderRadius.Small,
    background: Color.TextureInput,
    code: {
      fontSize: FontSize.Small,
      fontFamily: FontFamily.Monospace,
    },
  },
});

function render({ params, DOM }: { params: Params; DOM: VNode }): VNode {
  const { workspace, category, type, name } = params;
  return div(`.${baseStyle}`, [
    section(`.${previewStyle}`, [
      div(`.${previewInnerStyle}`, [
        header(`.${titleStyle}`, [small([`@cyclejs-project/${workspace}/${category}/${type}`]), h1([name])]),
        DOM,
      ]),
    ]),
  ]);
}

export function ExamplePage(so: SoAll, params$: Stream<Params>): SiAll {
  const page$ = params$.map(({ workspace, category, type, name }) =>
    examples[workspace] &&
    examples[workspace][category] &&
    examples[workspace][category][type] &&
    examples[workspace][category][type][name]
      ? isolate<SoAll, SiAll>(examples[workspace][category][type][name])(so)
      : { DOM: xs.of(div(['(´･ω･`)'])) },
  );

  const dom$ = xs
    .combine(
      params$,
      page$
        .map(page => xs.of(page))
        .flatten()
        .map(page => page.DOM)
        .flatten(),
    )
    .map(([params, DOM]) => render({ params, DOM }));

  return {
    DOM: dom$,
    router: xs.never(),
  };
}
