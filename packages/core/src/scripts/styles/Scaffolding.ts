import { Color, Dimension, FontFamily, MediaQuery } from '../constants/VO';
import { css, injectGlobal } from 'emotion';
import { gutter } from '../helpers/Style';

export function applyScaffoldingStyle() {
  injectGlobal({
    // Reset
    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },
    html: {
      fontFamily: 'sans-serif',
      lineHeight: 1.15,
      WebkitTextSizeAdjust: '100%',
      msTextSizeAdjust: '100%',
      msOverflowStyle: 'scrollbar',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      overflowX: 'hidden',
    },
    'article, aside, dialog, figcaption, figure, footer, header, hgroup, main, nav, section': {
      display: 'block',
    },
    '[tabindex="-1"]:focus': {
      outline: '0 !important',
    },
    a: {
      color: 'inherit',
    },
    'a:not([href]):not([tabindex])': {
      textDecoration: 'none',
      '&:focus': {
        outline: 0,
      },
    },
    figure: {
      margin: '0 0 1rem',
    },
    img: {
      verticalAlign: 'middle',
      borderStyle: 'none',
    },
    'svg:not(:root)': {
      overflow: 'hidden',
    },
    'input, button, select, optgroup, textarea': {
      margin: 0,
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
    },
    'button, input': {
      overflow: 'visible',
    },
    'button, select': {
      textTransform: 'none',
    },
    input: {
      minWidth: 0,
    },
    'select::-ms-expand': {
      display: 'none',
    },
    'button, html [type="button"], [type="reset"], [type="submit"]': {
      WebkitAppearance: 'button',
    },
    'button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner': {
      padding: 0,
      borderStyle: 'none',
    },
    'input:-ms-input-placeholder': {
      color: Color.TextPlaceholder,
    },
    'input[type="radio"], input[type="checkbox"]': {
      boxSizing: 'border-box',
      padding: 0,
    },
    'input[type="date"], input[type="time"], input[type="datetime-local"], input[type="month"]': {
      WebkitAppearance: 'listbox',
    },
    textarea: {
      overflow: 'auto',
      resize: 'vertical',
    },
    fieldset: {
      minWidth: 0,
      padding: 0,
      margin: 0,
      border: 0,
    },
    legend: {
      display: 'block',
      width: '100%',
      maxWidth: '100%',
      padding: 0,
      marginBottom: '.5rem',
      fontSize: '1.5rem',
      lineHeight: 'inherit',
      color: 'inherit',
      whiteSpace: 'normal',
    },
    progress: {
      verticalAlign: 'baseline',
    },
    '[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button': {
      height: 'auto',
    },
    '[type="search"]': {
      outlineOffset: '-2px',
      WebkitAppearance: 'none',
    },
    '[type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration': {
      WebkitAppearance: 'none',
    },
    '::-webkit-file-upload-button': {
      font: 'inherit',
      WebkitAppearance: 'button',
    },
    // Scaffolding
    'html, body': {
      margin: 0,
      padding: 0,
      color: Color.TextDefault,
      fontFamily: FontFamily.Default,
      fontWeight: 500,
      fontFeatureSettings: `'palt' 1`,
      background: Color.TextureBody,
      svg: {
        fill: Color.TextDefault,
      },
    },
    '@media print': {
      'a[href]:after': {
        content: '""" !important"',
      },
      '@page': {
        margin: 0,
      },
      body: {
        margin: '1.6cm',
      },
    },
  });
  /* eslint no-unused-expressions: 0 */
  injectGlobal`
    @font-face {
      font-family: 'Noto Sans Japanese';
      font-style: normal;
      font-weight: normal;
      font-display: swap;
      src: local('Noto Sans Japanese'),
        url('assets/fonts/noto-sans/NotoSansJP-Regular.woff') format('woff');
    }
    @font-face {
      font-family: 'Noto Sans Japanese';
      font-style: normal;
      font-weight: bold;
      font-display: swap;
      src: local('Noto Sans Japanese Bold'),
        url('assets/fonts/noto-sans/NotoSansJP-Medium.woff') format('woff');
    }
    @font-face {
      font-family: 'Noto Serif Japanese';
      font-style: normal;
      font-weight: normal;
      font-display: swap;
      src: local('Noto Serif Japanese'),
        url('assets/fonts/noto-serif/NotoSerifJP-Regular.woff') format('woff');
    }
    @font-face {
      font-family: 'Noto Serif Japanese';
      font-style: normal;
      font-weight: bold;
      font-display: swap;
      src: local('Noto Serif Japanese Bold'),
        url('assets/fonts/noto-serif/NotoSerifJP-SemiBold.woff') format('woff');
    }
`;
}

export namespace Container {
  export const base = css({
    padding: `0 ${gutter(2)}`,
  });

  export const offset = css({
    padding: `${gutter(2)} ${gutter(2)} ${gutter(4)} calc(${Dimension.DrawerMenuWidth}px + ${gutter(2)})`,
    [MediaQuery.MinWidthSm]: {
      padding: `${gutter(2)} ${gutter(4)} ${gutter(4)} calc(${Dimension.DrawerMenuWidth}px + ${gutter(4)})`,
    },
  });

  export const fullscreen = css({
    display: 'flex',
    padding: `${gutter(8)} ${gutter(2)} 0`,
    width: '100%',
    height: '100vh',
    flexDirection: 'row',
    justifyContent: 'center',
    [MediaQuery.MinWidthSm]: {
      padding: `${gutter(8)} ${gutter(4)} 0`,
    },
  });

  export const addinOffset = css({
    padding: 0,
  });
}
