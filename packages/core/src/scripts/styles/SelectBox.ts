import { Color, Duration, FontSize, LineHeight } from '../constants/VO';
import { css } from 'emotion';
import { gutter } from '../helpers/Style';

function variantColor(color: Color) {
  return {
    borderBottomColor: color,
    '&:focus': {
      boxShadow: `0 1px 0 0 ${color}`,
    },
  };
}

export namespace SelectBox {
  export const base = css({
    width: '100%',
    padding: `7px ${gutter(3)} 6px 0`,
    border: 'none',
    borderBottom: '1px solid',
    borderRadius: 0,
    boxShadow: 'none',
    color: Color.TextDefault,
    fontSize: FontSize.Regular,
    lineHeight: LineHeight.Regular,
    background: 'transparent url(assets/images/caret-vertical.svg) no-repeat',
    backgroundPosition: `right ${gutter(1)} center`,
    backgroundSize: '18px 18px',
    backgroundClip: 'padding-box',
    outline: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    msProgressAppearance: 'none',
    transition: `border-bottom ${Duration.Fade}, box-shadow ${Duration.Fade}`,
    '&:focus': {
      outline: 0,
    },
    '&:disabled': {
      backgroundColor: Color.TextureInput,
    },
  });

  export const neutral = css(variantColor(Color.StatusPrimaryDark));

  export const inspection = css(variantColor(Color.DomainInspection));

  export const library = css(variantColor(Color.DomainLibrary));
}
