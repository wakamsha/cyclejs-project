import { Color, FontSize, IconSize, LineHeight } from '../constants/VO';
import { css } from 'emotion';
import { gutter, square } from '../helpers/Style';

function variantColor(color: Color) {
  return {
    borderBottom: `1px solid ${color}`,
    '&:focus-within': {
      boxShadow: `0 1px 0 0 ${color}`,
    },
  };
}

const baseStyle = css({
  display: 'flex',
  fontSize: FontSize.Regular,
  alignItems: 'center',
  '&:focus-within': {
    outline: 'none',
  },
});

export namespace TextInput {
  export const iconPrefix = css({
    display: 'inline-block',
    ...square(IconSize.Large),
    marginRight: gutter(2),
    flexShrink: 0,
  });

  export const input = css({
    display: 'inline-flex',
    flexGrow: 1,
    flexBasis: '100%',
    padding: `${gutter(1)} ${gutter(2)} ${gutter(1)} 0`,
    border: 'none',
    color: Color.TextDefault,
    lineHeight: LineHeight.Regular,
    background: 'transparent',
    outline: 0,
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    msProgressAppearance: 'none',
    '&:-webkit-autofill': {
      boxShadow: `0 0 0 1000px ${Color.TextureBody} inset`,
      '&:focus': {
        boxShadow: `0 0 0 1000px ${Color.TextureBody} inset`,
      },
    },
    '&::placeholder': {
      color: Color.TextPlaceholder,
    },
    '&:disabled': {
      color: Color.TextSub,
      backgroundColor: Color.TextureInput,
    },
    '&::-ms-input-placeholder, &::placeholder': {
      color: Color.TextPlaceholder,
    },
    '&::-ms-clear': {
      display: 'none',
    },
  });

  export const invalidIndicator = css({
    display: 'inline-block',
    ...square(IconSize.Large),
    flexShrink: 0,
    '> svg': {
      fill: Color.StatusDangerDefault,
    },
  });

  export const neutral = css(baseStyle, variantColor(Color.StatusPrimaryDark));
  export const inspection = css(baseStyle, variantColor(Color.DomainInspection));
  export const library = css(baseStyle, variantColor(Color.DomainLibrary));
  export const danger = css(baseStyle, variantColor(Color.StatusDangerDefault));
}
