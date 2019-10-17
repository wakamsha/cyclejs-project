import { Color, ColorTheme, FontSize } from '../../constants/VO';
import { SiAll, SoAll } from '../../drivers/interface';
import { VNode, div, label, p } from '@cycle/dom';
import { css } from 'emotion';
import { gutter, symbolNecessary } from '../../helpers/Style';
import xs from 'xstream';

type Props = Partial<{
  theme: ColorTheme;
  required: boolean;
  htmlFor: string;
}>;

const baseStyle = css({
  display: 'inline-block',
  marginBottom: gutter(1),
  fontSize: FontSize.Tiny,
  userSelect: 'none',
});

const hasCautionStyle = css(symbolNecessary('back'));

function variantColor(color: Color) {
  return {
    color,
  };
}

const themes = {
  neutral: css(variantColor(Color.TextDefault)),
  inspection: css(variantColor(Color.DomainInspection)),
  library: css(variantColor(Color.DomainLibrary)),
};

export function FormLabel(props: Props, children: (string | VNode)[] = []): VNode {
  return label(
    `.${baseStyle}.${themes[props.theme || 'neutral']}`,
    {
      attrs: {
        for: !!props.htmlFor,
      },
      class: {
        [hasCautionStyle]: !!props.required,
      },
    },
    children,
  );
}

export function example(_: SoAll): SiAll {
  return {
    DOM: xs.of(
      div([
        p([FormLabel({}, ['Neutral'])]),
        p([FormLabel({ theme: 'inspection' }, ['Inspection'])]),
        p([FormLabel({ theme: 'library' }, ['Library'])]),
        p([FormLabel({ required: true }, ['Required'])]),
      ]),
    ),
  };
}
