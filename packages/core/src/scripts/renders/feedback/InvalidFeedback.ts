import { Color, FontSize, LineHeight } from '../../constants/VO';
import { SiAll, SoAll } from '../../drivers/interface';
import { VNode, li, ul } from '@cycle/dom';
import { css } from 'emotion';
import { gutter } from '../../helpers/Style';
import xs from 'xstream';

type Props = {
  keyName: string;
  errors: any[]; // @FIXME Type
};

const baseStyle = css({
  padding: 0,
  margin: `${gutter(1)} 0 0`,
  listStyle: 'none',
});

const itemStyle = css({
  color: Color.StatusDangerDefault,
  fontSize: FontSize.Tiny,
  lineHeight: LineHeight.Regular,
});

export function InvalidFeedback({ keyName, errors }: Props): VNode | null {
  const error = errors.find(({ key }) => key === keyName);
  if (error) {
    return ul(
      `.${baseStyle}`,
      error.conditions.map((condition: string) => li(`.${itemStyle}`, [`${error.key_i18n}${condition}`])),
    );
  }
  return null;
}

export function example(_: SoAll): SiAll {
  const errorResult = {
    code: 401,
    message: 'メールアドレスまたはパスワードが正しくありません。',
    errors: [
      {
        key: 'email',
        key_i18n: 'メールアドレス',
        conditions: ['が入力されていません。', 'には最大255文字までしか入力できません。'],
      },
      {
        key: 'password',
        key_i18n: 'パスワード',
        conditions: ['が入力されていません。', 'には最大72文字までしか入力できません。'],
      },
    ],
  };

  return {
    DOM: xs.of(InvalidFeedback({ keyName: 'email', errors: errorResult.errors })),
  };
}
