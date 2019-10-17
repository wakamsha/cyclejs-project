import { Action } from '../../interface';
import { SiAll, SoAll } from '../../drivers/interface';
import { Store, initialStore, makeUpdateNameAction } from '../../stores/HomeStore';
import { TextField } from '@cyclejs-project/core/renders/inputs/TextField';
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

function render({ name, scroll }: { name: string; scroll: string }): VNode {
  return div(
    {
      style: {
        height: '3000px',
      },
    },
    [
      h1(['hello world!']),
      TextField(`.event-input-name`, { value: name, label: 'Name' }),
      p([name ? `Hello, ${name}!!` : 'What is your name?']),
      button('.event-click-go-about', ['About >>']),
      renderScrollForm({ scroll }),
    ],
  );
}

export function IndexPage({ DOM, Scroll }: SoAll): SiAll {
  const eventClickGoAbout$: Stream<Event> = DOM.select('.event-click-go-about').events('click');
  const inputScroll$: Stream<Event> = DOM.select(`.event-input-offset`).events('input');
  const eventInputName$: Stream<Event> = DOM.select('.event-input-name').events('input');

  const store$: Stream<Store> = eventInputName$
    .map(e => makeUpdateNameAction((e.target as HTMLInputElement).value))
    .fold((acc: Store, action: Action<Store>) => action(acc), initialStore);

  const dom$ = xs.combine(store$, Scroll.startWith('')).map(([{ name }, scroll]) => render({ name, scroll }));
  const router$ = eventClickGoAbout$.mapTo('/about');

  return {
    DOM: dom$,
    router: router$,
    Scroll: inputScroll$.map((e: Event) => ({
      offsetTop: Number((e.target as HTMLInputElement).value),
    })),
  };
}
