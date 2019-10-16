import { Color, FontSize, LineHeight, SupportsQuery, ZIndex } from '../constants/VO';
import { ObjectFitProperty, PositionProperty, TextAlignProperty, WhiteSpaceProperty } from 'csstype';
import { color } from 'csx';

export function gutter(val: number): string {
  return `${8 * val}px`;
}

export function textureOverlay() {
  return `${color(Color.TextureBackdrop).fade(0.8)}`;
}

export function pageTitle() {
  return {
    margin: 0,
    fontSize: FontSize.Medium,
    lineHeight: LineHeight.Regular,
    whiteSpace: 'nowrap' as WhiteSpaceProperty,
  };
}

export function square(val: string | number) {
  return {
    width: val,
    height: val,
  };
}

export function textEllipsis() {
  return {
    whiteSpace: 'nowrap' as WhiteSpaceProperty,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
}

export function clickable() {
  return {
    position: 'relative' as PositionProperty,
    cursor: 'pointer',
    '&:after': {
      display: 'block',
      content: `''`,
      ...square('100%'),
      position: 'absolute' as PositionProperty,
      top: 0,
      left: 0,
    },
  };
}

export function brokenImagePolyfill(msg?: string) {
  return {
    position: 'relative' as PositionProperty,
    display: 'block',
    overflow: 'hidden',
    '&::before,&::after': {
      display: 'block',
      position: 'absolute' as PositionProperty,
      width: '100%',
    },
    '&::before': {
      top: 0,
      left: 0,
      height: '100%',
      backgroundColor: Color.StatusDisabled,
      content: `' '`,
    },
    '&::after': {
      top: '50%',
      left: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
      fontSize: msg ? FontSize.Tiny : FontSize.Regular,
      fontFamily: 'FontAwesome',
      textAlign: 'center' as TextAlignProperty,
      content: `"\f127" " " "${msg || ''}"`,
    },
  };
}

export function symbolNecessary(position: 'front' | 'back') {
  return {
    '&::before, &::after': {
      color: Color.SymbolNotification,
      fontSize: FontSize.Regular,
    },
    ...(position === 'front'
      ? {
          '&::before': {
            marginRight: gutter(0.5),
            content: `'*'`,
          },
        }
      : {}),
    ...(position === 'back'
      ? {
          '&::after': {
            marginLeft: gutter(0.5),
            content: `'*'`,
          },
        }
      : {}),
  };
}

export function viewNoContent(afterProps: any) {
  const size = '172px';
  return {
    position: 'relative' as PositionProperty,
    width: '100%',
    marginTop: gutter(15),
    paddingTop: size,
    textAlign: 'center' as TextAlignProperty,
    '&:after': {
      opacity: 0.5,
      position: 'absolute' as PositionProperty,
      top: 0,
      left: '50%',
      transform: 'translate3d(-50%, 0, 0)',
      ...square(size),
      backgroundPosition: 'center top',
      backgroundSize: size,
      content: `''`,
      ...afterProps,
    },
  };
}

export function pageHeader() {
  return {
    position: 'relative' as 'relative',
    zIndex: ZIndex.PageHeader,
    margin: `0 ${gutter(20)} 0 ${gutter(6)}`,
    minHeight: 40,
  };
}

export function croppedImage() {
  return {
    position: 'absolute' as PositionProperty,
    width: '100%',
    height: 'auto',
    top: 0,
    left: '50%',
    minHeight: '100%',
    minWidth: '100%',
    transform: 'translateX(-50%)',
    [SupportsQuery.ObjectFit]: {
      position: 'static' as PositionProperty,
      height: '100%',
      left: 0,
      ObjectFit: 'cover' as ObjectFitProperty,
      objectFit: 'cover' as ObjectFitProperty,
      objectPosition: 'top',
      transform: 'none',
    },
  };
}
