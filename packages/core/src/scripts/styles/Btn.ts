import { BorderRadius, Color, Duration, FontSize, IconSize } from '../constants/VO';
import { css } from 'emotion';
import { gutter, square } from '../helpers/Style';

function variantColor(defaultColor: Color, hover: Color, ghostHover: Color) {
  return {
    borderColor: defaultColor,
    backgroundColor: defaultColor,
    color: 'white',
    fill: 'white',
    '&:hover': {
      borderColor: hover,
      backgroundColor: hover,
    },
    '> svg': {
      fill: 'white',
    },
    [`&.${Btn.ghost}`]: {
      color: defaultColor,
      fill: defaultColor,
      '&:hover': {
        borderColor: defaultColor,
        backgroundColor: `${ghostHover} !important`,
      },
      '> svg': {
        fill: defaultColor,
      },
    },
    [`&.${Btn.bare}`]: {
      '&, & > svg': {
        color: defaultColor,
        fill: defaultColor,
        '&:hover': {
          backgroundColor: `${ghostHover} !important`,
        },
      },
    },
  };
}

export namespace Btn {
  export const label = css({
    '+ svg': {
      marginLeft: gutter(0.5),
    },
  });

  export const base = css({
    display: 'inline-flex',
    minWidth: 128,
    padding: '6px 20px',
    color: 'white',
    fontSize: FontSize.Small,
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'manipulation',
    cursor: 'pointer',
    userSelect: 'none',
    border: '1px solid transparent',
    borderRadius: BorderRadius.Circle,
    outline: 'none',
    transition: `background-color ${Duration.Fade}, color ${Duration.Fade}, fill ${Duration.Fade}`,
    '&:disabled': {
      borderColor: Color.StatusDisabled,
      backgroundColor: Color.StatusDisabled,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '&:hover, &:active': {
      textDecoration: 'none',
    },
    '&:active': {
      transition: 'none',
    },
    '> svg': {
      ...square(IconSize.Small),
      '&:first-child:not(:last-child)': {
        marginLeft: gutter(-1),
      },
      '&:last-child:not(:first-child)': {
        marginRight: gutter(-1),
      },
      [`+ .${label}`]: {
        marginLeft: gutter(0.5),
      },
    },
  });

  export const ghost = css({
    backgroundColor: 'transparent !important',
    '&:disabled': {
      color: `${Color.StatusDisabled} !important`,
      fill: `${Color.StatusDisabled} !important`,
      borderColor: Color.StatusDisabled,
      backgroundColor: 'transparent',
    },
  });

  export const block = css({
    display: 'flex',
    width: '100%',
  });

  export const bare = css({
    minWidth: 'auto',
    background: 'transparent !important',
    borderColor: 'transparent !important',
  });

  export const primary = css(
    variantColor(Color.ActionPrimaryDefault, Color.ActionPrimaryDark, Color.ActionPrimaryLighter),
  );

  export const inverse = css(
    variantColor(Color.ActionInverseDefault, Color.ActionInverseDark, Color.ActionInverseLighter),
  );
}
