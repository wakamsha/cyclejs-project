import { Btn } from '../../styles/Btn';
import { Icon } from '../dataDisplay/Icon';
import { SiAll, SoAll } from '../../drivers/interface';
import { VNode, button, div, h3, p, span } from '@cycle/dom';
import xs from 'xstream';

type Props = Partial<{
  theme: 'primary' | 'inverse';
  type: 'submit' | 'reset' | 'button';
  ghost: boolean;
  bare: boolean;
  block: boolean;
  disabled: boolean;
}>;

export function Button(
  selector: string,
  { theme = 'primary', type = 'button', ghost, bare, block, disabled }: Props,
  children: (string | VNode | null)[],
): VNode {
  return button(
    `${selector}.${Btn.base}.${Btn[theme]}`,
    {
      class: {
        [Btn.ghost]: !!ghost,
        [Btn.bare]: !!bare,
        [Btn.block]: !!block,
      },
      props: {
        disabled,
        type,
      },
    },
    children.map(child => (typeof child === 'string' ? span(`.${Btn.label}`, [child]) : child)),
  );
}

export function example(_: SoAll): SiAll {
  return {
    DOM: xs.of(
      div([
        h3(['Neutral']),
        Button(`.btn`, {}, ['Primary']),
        Button(`.btn`, { theme: 'inverse' }, ['Inverse']),
        Button(`.btn`, { theme: 'primary', disabled: true }, ['Disabled']),
        h3(['Ghost']),
        Button(`.btn`, { ghost: true }, ['Primary']),
        Button(`.btn`, { ghost: true, theme: 'inverse' }, ['Inverse']),
        Button(`.btn`, { ghost: true, theme: 'primary', disabled: true }, ['Disabled']),
        h3(['Bare']),
        Button(`.btn`, { bare: true }, ['Primary']),
        Button(`.btn`, { bare: true, theme: 'inverse' }, ['Inverse']),
        h3(['With Icon']),
        Button(`.btn`, {}, [Icon('plus'), 'Prefix']),
        Button(`.btn`, { ghost: true }, ['Suffix', Icon('plus')]),
        Button(`.btn`, {}, [Icon('plus')]),
        h3(['Block']),
        p([Button(`.btn`, { block: true }, ['Primary'])]),
        p([Button(`.btn`, { block: true, ghost: true }, ['Primary'])]),
      ]),
    ),
  };
}
