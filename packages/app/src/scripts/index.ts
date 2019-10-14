import { Action } from './interface';
import { Observable, combineLatest } from 'rxjs';
import { SiAll, SoAll } from './drivers/interface';
import { Store, initialStore, makeUpdateNameAction } from './stores/MainStore';
import { TextField } from './components/TextField';
import { VNode, div, h1, p } from '@cycle/dom';
import { makeDOMDriver } from '@cycle/dom/lib/cjs/rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import { run } from '@cycle/rxjs-run';

function render({
  name,
  textFieldDOM,
  passwordFieldDOM,
}: {
  name: string;
  textFieldDOM: VNode;
  passwordFieldDOM: VNode;
}): VNode {
  return div([h1(['My Project']), textFieldDOM, passwordFieldDOM, p([`hello, ${name}.`])]);
}

function main({ DOM }: SoAll): SiAll {
  const nameField = TextField({
    DOM,
    props: {
      value: initialStore.name,
      formLabel: 'NAME',
      placeholder: 'What is your name?',
    },
  });

  const passwordField = TextField({
    DOM,
    props: {
      value: '',
      formLabel: 'PASSWORD',
      type: 'password',
    },
  });

  const store$: Observable<Store> = nameField.value$.pipe(
    map(value => makeUpdateNameAction(value)),
    scan((acc: Store, action: Action<Store>) => action(acc), initialStore),
    startWith(initialStore),
  );

  const dom$ = combineLatest(store$, nameField.DOM, passwordField.DOM, ({ name }, textFieldDOM, passwordFieldDOM) =>
    render({ name, textFieldDOM, passwordFieldDOM }),
  );

  return {
    DOM: dom$,
  };
}

run(main, {
  DOM: makeDOMDriver('#app'),
});
