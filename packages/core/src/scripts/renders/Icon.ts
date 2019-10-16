import { FontSize } from '../constants/VO';
import { IconName, iconElements } from '@cyclejs-project/icon';
import { SiAll, SoAll } from 'src/scripts/drivers/interface';
import { VNode, li, span, svg, ul } from '@cycle/dom';
import { css } from 'emotion';
import { gutter, square } from '../helpers/Style';
import { lensPath, mergeAll, over } from 'ramda';
import xs from 'xstream';

type Props = {
  size: number;
};

export function Icon(key: IconName, props?: Props): VNode {
  const vnode = typeof iconElements[key] === 'function' ? iconElements[key]() : svg();

  if (props && vnode.data) {
    return over(
      lensPath(['data', 'attrs']),
      attrs => mergeAll([attrs, { width: props.size, height: props.size }]),
      vnode,
    );
  }
  return vnode;
}

export function example(_: SoAll): SiAll {
  const baseStyle = css({
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '> li': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...square(96),
      margin: `0 ${gutter(2)} ${gutter(8)}`,
      '> svg': {
        ...square(72),
      },
      '> span': {
        fontSize: FontSize.Regular,
      },
    },
  });

  return {
    DOM: xs.of(
      ul(
        `.${baseStyle}`,
        Object.keys(iconElements).map(iconName => li([Icon(iconName as IconName), span([iconName])])),
      ),
    ),
  };
}
