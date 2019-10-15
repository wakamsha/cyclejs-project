import { AboutIndexPage } from './pages/abouts/IndexPage';
import { IndexPage } from './pages/homes/IndexPage';
import { RouteMatcherReturn, routerify } from 'cyclic-router';
import { SiAll, SoAll } from './drivers/interface';
import { assoc } from 'ramda';
import { makeDOMDriver } from '@cycle/dom';
import { makeHistoryDriver } from '@cycle/history';
import { makeScrollDriver } from './drivers/ScrollDriver';
import run from '@cycle/run';
import switchPath from 'switch-path';
import xs from 'xstream';

function main(so: SoAll): SiAll {
  const match$ = so.router.define({
    '/': IndexPage,
    '/about': AboutIndexPage,
  });

  const page$ = match$.map((match: RouteMatcherReturn) =>
    match.value(assoc('router', so.router.path(match.path || '/'))(so)),
  );

  return {
    DOM: page$.map((sinks: SiAll) => sinks.DOM).flatten(),
    router: page$.map((sinks: SiAll) => sinks.router).flatten(),
    Scroll: page$.map((sinks: SiAll) => sinks.Scroll || xs.never()).flatten(),
  };
}

run(routerify(main, switchPath), {
  DOM: makeDOMDriver('#app'),
  history: makeHistoryDriver(),
  Scroll: makeScrollDriver(),
});
