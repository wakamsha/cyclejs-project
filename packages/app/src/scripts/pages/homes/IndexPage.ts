import { Action } from 'src/scripts/interface';
import { SiAll, SoAll } from 'src/scripts/drivers/interface';
import { Store, initialStore, makeUpdateNameAction } from 'src/scripts/stores/HomeStore';
import { TextField } from 'src/scripts/components/TextField';
import { VNode, button, div, h1, input, p } from '@cycle/dom';
import xs, { Stream } from 'xstream';

function renderScrollForm({ scroll }: { scroll: string }): VNode {
  return div(
    {
      style: {
        position: 'fixed',
        top: '16px',
        right: '16px',
      },
    },
    [
      input(`.event-input-offset`, {
        props: {
          type: 'number',
        },
      }),
      p([scroll]),
    ],
  );
}

function render({ name, nameFieldDOM, scroll }: { name: string; nameFieldDOM: VNode; scroll: string }): VNode {
  return div(
    {
      style: {
        height: '3000px',
      },
    },
    [
      h1(['hello world!']),
      nameFieldDOM,
      p([name ? `Hello, ${name}!!` : 'What is your name?']),
      button('.event-click-go-about', ['About >>']),
      renderScrollForm({ scroll }),
    ],
  );
}

export function IndexPage({ DOM, Scroll }: SoAll): SiAll {
  const eventClickGoAbout$: Stream<Event> = DOM.select('.event-click-go-about').events('click');
  const inputScroll$: Stream<Event> = DOM.select(`.event-input-offset`).events('input');

  const nameField = TextField({
    DOM,
    props: {
      value: initialStore.name,
      label: 'NAME',
      placeholder: 'taro yamada',
    },
  });

  const store$: Stream<Store> = nameField.value$
    .map(value => makeUpdateNameAction(value))
    .fold((acc: Store, action: Action<Store>) => action(acc), initialStore);

  const dom$ = xs
    .combine(store$, nameField.DOM, Scroll.startWith(''))
    .map(([{ name }, nameFieldDOM, scroll]) => render({ name, nameFieldDOM, scroll }));
  const router$ = eventClickGoAbout$.mapTo('/about');

  return {
    DOM: dom$,
    router: router$,
    Scroll: inputScroll$.map((e: Event) => ({
      offsetTop: Number((e.target as HTMLInputElement).value),
    })),
  };
}
