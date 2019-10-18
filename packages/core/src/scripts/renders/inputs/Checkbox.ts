import { BorderRadius, Color, Duration, FontSize } from '../../constants/VO';
import { SiAll, SoAll } from '../../drivers/interface';
import { VNode, label as htmlLabel, input, li, span, ul } from '@cycle/dom';
import { css } from 'emotion';
import { gutter, square } from '../../helpers/Style';
import xs from 'xstream';

type Props = {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
};

const baseStyle = css({
  position: 'relative',
  cursor: 'pointer',
  'input[type=checkbox]': {
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
      borderRadius: BorderRadius.Small,
      backgroundColor: 'white',
      transition: `border ${Duration.Fade}, background-color ${Duration.Fade}`,
    },
    '&:after': {
      borderBottom: '3px solid',
      borderRight: '3px solid',
      borderColor: 'transparent',
    },
  },
  'input[type=checkbox]:checked:not(:indeterminate)': {
    '+ span:before': {
      border: `1px solid ${Color.LineDark}`,
      background: Color.ActionPrimaryDefault,
    },
    '+ span:after': {
      borderColor: 'white',
      top: 2,
      left: 6,
      transform: 'rotate(40deg)',
      width: 7,
      height: 13,
      transition: `border-color ${Duration.Fade}`,
    },
  },
  'input[type=checkbox]:indeterminate': {
    '+ span:before': {
      border: `1px solid ${Color.LineDark}`,
      background: Color.ActionPrimaryDefault,
    },
    '+ span:after': {
      borderColor: 'white',
      top: 8,
      left: 4,
      width: 12,
    },
  },
  'input[type=checkbox]:disabled': {
    '+ span, + span:before, + span:after': {
      cursor: 'not-allowed',
    },
    '+ span:before': {
      borderColor: '#C8CBCE',
      background: Color.StatusDisabled,
    },
  },
});

export function Checkbox(selector: string, { label = '', checked, disabled, indeterminate }: Props): VNode {
  return htmlLabel(`${selector}.${baseStyle}`, [
    input({
      attrs: {
        type: 'checkbox',
      },
      props: {
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
        li([Checkbox('.check', {})]),
        li([Checkbox('.check', { label: 'Checkbox 1' })]),
        li([Checkbox('.check', { label: 'Disabled', disabled: true })]),
        li([Checkbox('.check', { label: 'Disabled', disabled: true, checked: true })]),
      ]),
    ),
  };
}
