import { Color } from '@cyclejs-project/core/constants/VO';
import { ExamplePage } from './pages/ExamplePage';
import { IndexPage } from './pages/IndexPage';
import { Navigation } from './components/Navigation';
import { RouteMatcherReturn, routerify } from 'cyclic-router';
import { SiAll, SoAll } from './drivers/interface';
import { applyScaffoldingStyle } from '@cyclejs-project/core/styles/Scaffolding';
import { assoc } from 'ramda';
import { css } from 'emotion';
import { div, makeDOMDriver } from '@cycle/dom';
import { makeHistoryDriver } from '@cycle/history';
import run from '@cycle/run';
import switchPath from 'switch-path';
import xs, { Stream } from 'xstream';

const baseStyle = css({
  display: 'flex',
  height: '100vh',
});

const navigationWrapperStyle = css({
  flexShrink: 0,
});

const mainContentStyle = css({
  background: Color.TextureBody,
  flexGrow: 1,
});

function main(so: SoAll): SiAll {
  const match$ = so.router.define({
    '/': IndexPage,
    '/:workspace/:category/:type/:name': (workspace: string, category: string, type: string, name: string) => (
      so: SoAll,
    ) => ExamplePage(so, xs.of({ workspace, category, type, name })),
  });

  const page$: Stream<SiAll> = match$.map((match: RouteMatcherReturn) =>
    match.value(assoc('router', so.router.path(match.path || '/'))(so)),
  );

  const navigation = Navigation({
    DOM: so.DOM,
    router: so.router,
  });

  const dom$ = xs
    .combine(navigation.DOM, page$.map((sinks: SiAll) => sinks.DOM).flatten())
    .map(([navigationDOM, page]) =>
      div(`.${baseStyle}`, [div(`.${navigationWrapperStyle}`, [navigationDOM]), div(`.${mainContentStyle}`, [page])]),
    );

  const router$ = xs.merge(page$.map((sinks: SiAll) => sinks.router || xs.never()).flatten(), navigation.router);

  return {
    DOM: dom$,
    router: router$,
  };
}

applyScaffoldingStyle();

run(routerify(main, switchPath), {
  DOM: makeDOMDriver('#app'),
  history: makeHistoryDriver(),
});
