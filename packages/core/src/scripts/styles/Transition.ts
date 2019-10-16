import { Duration, Easing } from '../constants/VO';
import { css } from 'emotion';

const OFFSET = 30;
const RATIO = 0.98;

export namespace Transition {
  export const ENTER_DELAY = 120;

  export const base = css({
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    flexShrink: 0,
  });

  export const animation = css({
    opacity: 1,
    height: '100%',
    transition: `transform ${Duration.Enter} ${Easing.Enter} ${ENTER_DELAY}ms, opacity ${Duration.Enter} ${Easing.Enter} ${ENTER_DELAY}ms`,
    transform: 'none',
  });

  export const enter = css({
    opacity: 0,
    position: 'absolute',
    transition: 'none',
  });

  export const exit = css({
    opacity: 0,
    transition: `transform ${Duration.Leave} ${Easing.Leave}, opacity ${Duration.Leave} ${Easing.Leave}`,
  });

  export const horizontal = css({
    [`&.${enter}`]: {
      transform: `translate3d(${OFFSET}px, 0, 0)`,
    },
    [`&.${exit}`]: {
      transform: `translate3d(${OFFSET}px, 0, 0)`,
    },
  });

  export const vertical = css({
    [`&.${enter}`]: {
      transform: `translate3d(0, ${OFFSET}px, 0)`,
    },
    [`&.${exit}`]: {
      transform: `translate3d(0, ${OFFSET}px, 0)`,
    },
  });

  export const scale = css({
    [`&.${enter}`]: {
      transform: `scale3d(${RATIO}, ${RATIO}, 0)`,
    },
    [`&.${exit}`]: {
      transform: `scale3d(${RATIO}, ${RATIO}, 0)`,
    },
  });
}
