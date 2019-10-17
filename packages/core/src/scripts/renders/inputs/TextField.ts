import { ColorTheme } from '../../constants/VO';
import { FormLabel } from '../../renders/inputs/FormLabel';
import { Icon } from '../../renders/dataDisplay/Icon';
import { InvalidFeedback } from '../../renders/feedback/InvalidFeedback';
import { SiAll, SoAll } from '../../drivers/interface';
import { Stream } from 'xstream';
import { TextInput as Style } from '../../styles/TextInput';
import { VNode, code, div, h3, input, p, pre, span } from '@cycle/dom';

type InputType = 'text' | 'email' | 'password' | 'number';

type Props = Partial<{
  theme: ColorTheme;
  label: string;
  type: InputType;
  value: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  keyName: string;
  errorResult: any; // @FIXME Type
}>;

export function TextField(
  selector: string,
  {
    value,
    label,
    type = 'text',
    placeholder,
    disabled = false,
    theme = 'neutral',
    required = false,
    keyName,
    errorResult,
  }: Props,
  children: (string | VNode)[] = [],
): VNode {
  const invalid = !!errorResult && !!keyName;
  return div([
    label ? FormLabel({ theme, required }, [label]) : null,
    div(`.${invalid ? Style.danger : Style[theme]}`, [
      input(`${selector}.${Style.input}`, {
        attrs: {
          type,
          placeholder,
          disabled,
        },
        props: {
          value,
        },
      }),
      ...children,
      invalid ? span(`.${Style.invalidIndicator}`, [Icon('warning-o')]) : null,
    ]),
    errorResult && keyName ? InvalidFeedback({ keyName, errors: errorResult.errors }) : null,
  ]);
}

export function example({ DOM }: SoAll): SiAll {
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

  const eventInput$: Stream<Event> = DOM.select('.event-input').events('input');

  const value$ = eventInput$.map(e => (e.target as HTMLInputElement).value).startWith('');

  const dom$ = value$.map(value =>
    div([
      h3(['Basic']),
      TextField('.input', {}),
      h3(['With Clear button']),
      TextField('.event-input', { value }),
      pre([code([JSON.stringify({ value }, null, 2)])]),
      h3(['Variant']),
      p([TextField('.input', { label: '氏名' })]),
      p([TextField('.input', { label: 'メールアドレス', type: 'email' })]),
      p([TextField('.input', { label: 'パスワード', type: 'password' })]),
      p([TextField('.input', { label: 'Number', type: 'number' })]),
      p([TextField('.input', { label: 'Inspection color', theme: 'inspection', placeholder: 'Input text...' })]),
      p([TextField('.input', { label: 'Library color', theme: 'library', placeholder: 'Input text...' })]),
      p([TextField('.input', { label: 'Disabled', disabled: true, value: 'hello, world!' })]),
      p([TextField('.input', { errorResult, label: 'Error', keyName: 'email' })]),
    ]),
  );

  return {
    DOM: dom$,
  };
}
