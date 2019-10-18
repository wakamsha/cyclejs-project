import { FontSize, LineHeight, Shadow } from '../../constants/VO';
import { SiAll, SoAll } from '../../drivers/interface';
import { VNode, article, div, h3, p } from '@cycle/dom';
import { css } from 'emotion';
import { gutter } from '../../helpers/Style';
import xs from 'xstream';

type ShadowType = 'neutral' | 'dialog' | 'floating';

type Props = Partial<{
  shadow: ShadowType;
  width: number | string;
  hover: boolean;
}>;

function getBaseStyle(shadow: ShadowType, hover?: boolean) {
  const boxShadow = (() => {
    switch (shadow) {
      case 'dialog':
        return Shadow.Dialog;
      case 'floating':
        return Shadow.Floating;
      default:
        return Shadow.Neutral;
    }
  })();

  return css({
    boxShadow,
    background: 'white',
    ...(hover
      ? {
          transition: `box-shadow .1s ease-in`,
          '&:hover': {
            boxShadow: Shadow.Hover,
          },
        }
      : {}),
  });
}

export function Card({ shadow = 'neutral', width, hover }: Props, children: (string | VNode | null)[]): VNode {
  return article(
    `.${getBaseStyle(shadow, hover)}`,
    {
      style: {
        ...(width ? { width } : {}),
      },
    },
    children,
  );
}

export function example(_: SoAll): SiAll {
  const innerStyle = css({
    padding: gutter(2),
    fontSize: FontSize.Regular,
    lineHeight: LineHeight.Regular,
  });

  return {
    DOM: xs.of(
      div([
        h3(['Neutral']),
        Card({}, [
          div(`.${innerStyle}`, [
            p([
              'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。',
            ]),
          ]),
        ]),
        h3(['Dialog']),
        Card({ shadow: 'dialog' }, [
          div(`.${innerStyle}`, [
            p([
              'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。',
            ]),
          ]),
        ]),
        h3(['Floating']),
        Card({ shadow: 'floating' }, [
          div(`.${innerStyle}`, [
            p([
              'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。',
            ]),
          ]),
        ]),
        h3(['Hover']),
        Card({ hover: true }, [
          div(`.${innerStyle}`, [
            p([
              'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。',
            ]),
          ]),
        ]),
      ]),
    ),
  };
}
