import { SiDOM, SoDOM } from '../drivers/interface';
import { Stream } from 'xstream';
import { VNode, div, input, label } from '@cycle/dom';
import isolate from '@cycle/isolate';

type Props = {
  label: string;
  unit: string;
  min: number;
  max: number;
  init?: number;
};

type So = {
  props: Props;
} & SoDOM;

type Si = {
  value$: Stream<number>;
} & SiDOM;

function render({ value, props }: { value: number; props: Props }): VNode {
  return div([
    div([label([`${props.label} : ${value}${props.unit}`])]),
    input('.slider', {
      attrs: { type: 'range', min: props.min, max: props.max, value },
    }),
  ]);
}

function Component({ DOM, props }: So): Si {
  const eventInput$: Stream<Event> = DOM.select('.slider').events('input');

  const value$ = eventInput$.map((e: Event) => Number((e.target as HTMLInputElement).value)).startWith(props.init || 0);

  const dom$ = value$.map(value => render({ props, value }));

  return {
    value$,
    DOM: dom$,
  };
}

export function LabeledSlider(so: So): Si {
  return isolate<So, Si>(Component)(so);
}
