import { Color } from '@cyclejs-project/core/constants/VO';
import { Icon } from '@cyclejs-project/core/renders/Icon';
import { SiAll, SoAll } from '../drivers/interface';
import { VNode, div } from '@cycle/dom';
import { css } from 'emotion';
import { square } from '@cyclejs-project/core/helpers/Style';
import xs from 'xstream';

const baseStyle = css({
  display: 'flex',
  width: '100%',
  height: '100vh',
  background: '#282c34',
  alignItems: 'center',
  justifyContent: 'center',
  '> svg': {
    ...square(320),
    fill: Color.TextDefault,
  },
});

function render(): VNode {
  return div(`.${baseStyle}`, [Icon('brand-logo-with-type')]);
}

export function IndexPage(_: SoAll): SiAll {
  return {
    DOM: xs.of(render()),
    router: xs.never(),
  };
}
