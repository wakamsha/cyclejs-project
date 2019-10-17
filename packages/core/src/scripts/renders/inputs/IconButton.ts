import { Icon } from '../dataDisplay/Icon';
import { IconBtn } from '../../styles/IconBtn';
import { IconName } from '@cyclejs-project/icon';
import { SiAll, SoAll } from '../../drivers/interface';
import { VNode, button, div, h3 } from '@cycle/dom';
import { css } from 'emotion';
import { gutter } from '../../helpers/Style';
import xs from 'xstream';

type Props = {
  name: IconName;
  theme?: 'primary' | 'inverse';
  size?: 'small' | 'regular' | 'large';
  ghost?: boolean;
  bare?: boolean;
  disabled?: boolean;
};

export function IconButton(
  selector: string,
  { name, theme = 'primary', size = 'regular', ghost, bare, disabled }: Props,
): VNode {
  return button(
    `${selector}.${IconBtn.base}.${IconBtn[size]}.${IconBtn[theme]}`,
    {
      props: {
        disabled,
        tabIndex: -1,
      },
      class: {
        [IconBtn.ghost]: !!ghost,
        [IconBtn.bare]: !!bare,
      },
    },
    [Icon(name)],
  );
}

export function example(_: SoAll): SiAll {
  const rowStyle = css({
    display: 'flex',
    '& + &': {
      marginTop: gutter(2),
    },
    '> button + button': {
      marginLeft: gutter(3),
    },
  });

  return {
    DOM: xs.of(
      div([
        h3(['Neutral']),
        div(`.${rowStyle}`, [
          IconButton('.btn', { name: 'plus' }),
          IconButton('.btn', { name: 'plus', theme: 'inverse' }),
          IconButton('.btn', { name: 'plus', disabled: true }),
        ]),
        h3(['Ghost']),
        div(`.${rowStyle}`, [
          IconButton('.btn', { name: 'plus', ghost: true }),
          IconButton('.btn', { name: 'plus', ghost: true, theme: 'inverse' }),
          IconButton('.btn', { name: 'plus', ghost: true, disabled: true }),
        ]),
        h3(['Bare']),
        div(`.${rowStyle}`, [
          IconButton('.btn', { name: 'plus', bare: true }),
          IconButton('.btn', { name: 'plus', bare: true, theme: 'inverse' }),
          IconButton('.btn', { name: 'plus', bare: true, disabled: true }),
        ]),
        h3(['Size']),
        div(`.${rowStyle}`, [
          IconButton('.btn', { name: 'plus', size: 'small' }),
          IconButton('.btn', { name: 'plus', size: 'regular' }),
          IconButton('.btn', { name: 'plus', size: 'large' }),
        ]),
        div(`.${rowStyle}`, [
          IconButton('.btn', { name: 'plus', ghost: true, size: 'small' }),
          IconButton('.btn', { name: 'plus', ghost: true, size: 'regular' }),
          IconButton('.btn', { name: 'plus', ghost: true, size: 'large' }),
        ]),
        div(`.${rowStyle}`, [
          IconButton('.btn', { name: 'plus', bare: true, size: 'small' }),
          IconButton('.btn', { name: 'plus', bare: true, size: 'regular' }),
          IconButton('.btn', { name: 'plus', bare: true, size: 'large' }),
        ]),
      ]),
    ),
  };
}
