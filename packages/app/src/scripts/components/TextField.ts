import { CycleDOMEvent, VNode, div, input, label } from '@cycle/dom';
import { Observable } from 'rxjs';
import { SiDOM, SoDOM } from '../drivers/interface';
import { map, startWith } from 'rxjs/operators';
import isolate from '@cycle/isolate';

type InputType = 'text' | 'email' | 'password' | 'number';

type Props = {
  value: string;
  formLabel?: string;
  type?: InputType;
  placeholder?: string;
  // required: boolean;
};

type So = {
  props: Props;
} & SoDOM;

type Si = {
  value$: Observable<string>;
} & SiDOM;

function render({
  value,
  formLabel,
  type,
  placeholder,
}: {
  value: string;
  formLabel?: string;
  type?: InputType;
  placeholder?: string;
}): VNode {
  return div([
    formLabel ? label([formLabel]) : null,
    div([
      input('.event-input', {
        attrs: {
          type,
          placeholder,
        },
        props: {
          value,
        },
      }),
    ]),
  ]);
}

function Component({ DOM, props }: So): Si {
  const eventInput$ = DOM.select('.event-input').events('input');

  const value$ = eventInput$.pipe(
    map((e: CycleDOMEvent) => (e.ownerTarget as HTMLInputElement).value),
    startWith(props.value),
  );

  const dom$: Observable<VNode> = value$.pipe(map(value => render({ ...props, value })));

  return {
    DOM: dom$,
    value$,
  };
}

export function TextField(so: So): Si {
  return isolate<So, Si>(Component)(so);
}
