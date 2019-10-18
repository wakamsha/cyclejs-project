import { BorderRadius, Color, FontFamily, FontSize, IconSize } from '../../constants/VO';
import { Icon } from './Icon';
import { IconName } from '@cyclejs-project/icon';
import { SiAll, SoAll } from 'src/scripts/drivers/interface';
import { VNode, li, span, ul } from '@cycle/dom';
import { css } from 'emotion';
import { gutter, square } from '../../helpers/Style';
import xs from 'xstream';

type Props = {
  label: string;
  icon?: IconName;
  selector?: string;
};

const baseStyle = css({
  userSelect: 'none',
  display: 'inline-flex',
  verticalAlign: 'middle',
  marginRight: gutter(1),
  padding: `1px ${gutter(1)}`,
  border: `1px solid${Color.LineLight}`,
  borderRadius: BorderRadius.Small,
  color: Color.ActionPrimaryDefault,
  fontSize: FontSize.Tiny,
  fontFamily: FontFamily.Default,
  lineHeight: '1rem',
  backgroundColor: Color.TextureInput,
  '> svg': {
    ...square(IconSize.Small),
    marginRight: 2,
    fill: Color.ActionPrimaryDefault,
  },
});

export function Label({ label, icon, selector = '' }: Props): VNode {
  return span(`${selector}.${baseStyle}`, [icon ? Icon(icon) : null, label]);
}

export function example(_: SoAll): SiAll {
  const style = css({
    'li + li': {
      marginTop: gutter(1),
    },
  });

  return {
    DOM: xs.of(
      ul(`.${style}`, [
        li([Label({ label: '株式会社リーガルフォース' })]),
        li([Label({ label: 'English', icon: 'language' })]),
        li([Label({ label: '日本語', icon: 'language' })]),
        li([Label({ label: 'English', icon: 'language' }), Label({ label: '株式会社リーガルフォース' })]),
      ]),
    ),
  };
}
