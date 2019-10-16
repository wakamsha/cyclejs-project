import { SiDOM, SoDOM } from '../../drivers/interface';
import { Stream } from 'xstream';
import { VNode, div, input, label } from '@cycle/dom';
import isolate from '@cycle/isolate';

type InputType = 'text' | 'email' | 'password' | 'number';

type Props = {
  value: string;
  label?: string;
  type?: InputType;
  placeholder?: string;
  // required: boolean;
};

type So = {
  props: Props;
} & SoDOM;

type Si = {
  value$: Stream<string>;
} & SiDOM;

function render({ value, props }: { value: string; props: Props }): VNode {
  return div([
    props.label ? label([props.label]) : null,
    div([
      input('.event-input', {
        attrs: {
          type: props.type,
          placeholder: props.placeholder,
        },
        props: {
          value,
        },
      }),
    ]),
  ]);
}

function Component({ DOM, props }: So): Si {
  const eventInput$: Stream<Event> = DOM.select('.event-input').events('input');

  const value$ = eventInput$.map(e => (e.target as HTMLInputElement).value).startWith(props.value);

  const dom$ = value$.map(value => render({ value, props }));

  return {
    DOM: dom$,
    value$,
  };
}

export function TextField(so: So): Si {
  return isolate<So, Si>(Component)(so);
}
