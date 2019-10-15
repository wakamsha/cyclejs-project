import { Action } from 'src/scripts/interface';
import { SiAll, SoAll } from 'src/scripts/drivers/interface';
import { Store, initialStore, makeUpdateNameAction } from 'src/scripts/stores/HomeStore';
import { TextField } from 'src/scripts/components/TextField';
import { VNode, button, div, h1, p } from '@cycle/dom';
import xs, { Stream } from 'xstream';

function render({ name, nameFieldDOM }: { name: string; nameFieldDOM: VNode }): VNode {
  return div([
    h1(['hello world!']),
    nameFieldDOM,
    p([name ? `Hello, ${name}!!` : 'What is your name?']),
    button('.event-click-go-about', ['About >>']),
  ]);
}

export class IndexPage {
  public main({ DOM }: SoAll): SiAll {
    const eventClickGoAbout$: Stream<Event> = DOM.select('.event-click-go-about').events('click');

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

    const dom$ = xs.combine(store$, nameField.DOM).map(([{ name }, nameFieldDOM]) => render({ name, nameFieldDOM }));
    const router$ = eventClickGoAbout$.mapTo('/about');

    return {
      DOM: dom$,
      router: router$,
    };
  }
}
