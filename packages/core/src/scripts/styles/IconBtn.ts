import { BorderRadius, Color, Duration, IconSize } from '../constants/VO';
import { css } from 'emotion';
import { square } from '../helpers/Style';

function variantColor(neutral: Color, hover: Color, ghost: Color) {
  return {
    borderColor: neutral,
    backgroundColor: neutral,
    '&:hover': {
      borderColor: hover,
      backgroundColor: hover,
    },
    '> svg': {
      fill: 'white',
    },
    [`&.${IconBtn.ghost}`]: {
      fill: neutral,
      '&:hover': {
        borderColor: neutral,
        backgroundColor: `${ghost} !important`,
      },
      '> svg': {
        fill: neutral,
      },
    },
    [`&.${IconBtn.bare}`]: {
      '&, & > svg': {
        fill: neutral,
        '&:hover': {
          backgroundColor: `${ghost} !important`,
        },
      },
    },
  };
}

export namespace IconBtn {
  export const base = css({
    display: 'inline-flex',
    padding: 0,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'manipulation',
    cursor: 'pointer',
    userSelect: 'none',
    border: '1px solid transparent',
    borderRadius: BorderRadius.Circle,
    outline: 'none',
    transition: `background-color ${Duration.Fade}, fill ${Duration.Fade}, fill ${Duration.Fade}`,
    '&:disabled': {
      borderColor: Color.StatusDisabled,
      backgroundColor: Color.StatusDisabled,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '&:active': {
      transition: 'none',
    },
  });

  export const ghost = css({
    backgroundColor: 'transparent !important',
    '&disabled': {
      fill: `${Color.StatusDisabled} !important`,
      borderColor: Color.StatusDisabled,
      backgroundColor: 'transparent',
    },
  });

  export const bare = css({
    background: 'transparent !important',
    borderColor: 'transparent !important',
  });

  export const small = css({
    ...square(24),
    '> svg': {
      ...square(IconSize.Small),
    },
  });

  export const regular = css({
    ...square(32),
    '> svg': {
      ...square(IconSize.Regular),
    },
  });

  export const large = css({
    ...square(40),
    '> svg': {
      ...square(IconSize.Large),
    },
  });

  export const primary = css(
    variantColor(Color.ActionPrimaryDefault, Color.ActionPrimaryDark, Color.ActionPrimaryLighter),
  );

  export const inverse = css(
    variantColor(Color.ActionInverseDefault, Color.ActionInverseDark, Color.ActionInverseLighter),
  );
}
