import { BorderRadius, Color, Duration, FontSize } from '../../constants/VO';
import { SiAll, SoAll } from 'src/scripts/drivers/interface';
import { VNode, label as htmlLabel, input, li, span, ul } from '@cycle/dom';
import { css } from 'emotion';
import { gutter, square } from '../../helpers/Style';
import xs from 'xstream';

type Props = {
  name: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
};

const baseStyle = css({
  cursor: 'pointer',
  position: 'relative',
  'input[type=radio]': {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
  '> span': {
    position: 'relative',
    paddingLeft: gutter(4),
    fontSize: FontSize.Regular,
    userSelect: 'none',
    whiteSpace: 'nowrap',
    '&:empty': {
      paddingLeft: 20,
    },
    '&:before, &:after': {
      position: 'absolute',
      display: 'block',
      content: `''`,
    },
    '&:before': {
      top: 0,
      left: 0,
      ...square(20),
      border: '1px solid',
      borderColor: Color.LineDefault,
      borderRadius: BorderRadius.Circle,
      backgroundColor: 'white',
      transition: `border ${Duration.Fade}`,
    },
    '&:after': {
      top: 4,
      left: 4,
      transform: 'scale3d(0, 0, 1)',
      ...square(12),
      borderRadius: BorderRadius.Circle,
      background: Color.ActionPrimaryDefault,
      transition: `transform ${Duration.Fade}`,
    },
  },
  'input[type=radio]:checked': {
    '+ span:before': {
      border: `1px solid ${Color.LineDark}`,
    },
    '+ span:after': {
      transform: 'scale3d(1, 1, 1)',
    },
  },
  'input[type=radio]:disabled': {
    '+ span, + span:before, + span:after': {
      cursor: 'not-allowed',
    },
    '+ span:before': {
      borderColor: '#C8CBCE',
      background: Color.StatusDisabled,
    },
  },
});

export function Radio(selector: string, { name, label = '', checked, disabled, indeterminate }: Props): VNode {
  return htmlLabel(`${selector}.${baseStyle}`, [
    input({
      attrs: {
        type: 'radio',
      },
      props: {
        name,
        checked,
        disabled,
        indeterminate,
      },
    }),
    span([label]),
  ]);
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
        li([Radio('.check', { name: 'radio' })]),
        li([Radio('.check', { name: 'radio', label: 'Checkbox 1' })]),
        li([Radio('.check', { name: 'radio', label: 'Disabled', disabled: true })]),
        li([Radio('.check', { name: 'radio', label: 'Disabled', disabled: true, checked: true })]),
      ]),
    ),
  };
}
