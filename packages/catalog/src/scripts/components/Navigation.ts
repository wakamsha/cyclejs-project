import { Color, Duration, FontSize, IconSize, LineHeight } from '@cyclejs-project/core/constants/VO';
import { Icon } from '@cyclejs-project/core/renders/Icon';
import { SiDOM, SiRouter, SoDOM, SoRouter } from '@cyclejs-project/core/drivers/interface';
import { VNode, a, div, h1, h2, h3, h4, header, li, nav, span, ul } from '@cycle/dom';
import { css } from 'emotion';
import { examples } from '../constants/Examples';
import { gutter, square, textEllipsis } from '@cyclejs-project/core/helpers/Style';
import isolate from '@cycle/isolate';
import xs, { Stream } from 'xstream';

type So = {} & SoDOM & SoRouter;

type Si = SiDOM & SiRouter;

const baseStyle = css({
  display: 'flex',
  width: 272,
  height: '100vh',
  borderRight: `1px solid ${Color.LineLight}`,
  background: 'white',
  flexDirection: 'column',
});

const mastheadStyle = css({
  padding: `${gutter(1.5)} ${gutter(2)} ${gutter(2)}`,
  flexShrink: 0,
});

const bodyStyle = css({
  padding: `${gutter(2)} ${gutter(2)} ${gutter(10)}`,
  flexGrow: 1,
  overflowY: 'auto',
});

const logoStyle = css({
  display: 'flex',
  cursor: 'pointer',
  width: '100%',
  margin: `0 0 ${gutter(1)}`,
  padding: gutter(0.5),
  alignItems: 'center',
  fontSize: FontSize.Large,
  fontWeight: 'normal',
  lineHeight: LineHeight.Compressed,
  background: 'transparent',
  transition: `background ${Duration.Enter}`,
  '&:hover': {
    background: Color.StatusPrimaryLight,
  },
  '> svg': {
    pointerEvents: 'none',
    ...square(IconSize.Large),
  },
  '> span': {
    marginLeft: gutter(0.5),
    backgroundImage: 'linear-gradient(-125deg, #0af, #0080ff, #ff00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textTransform: 'uppercase',
  },
});

const workspaceStyle = css({
  '& + &': {
    marginTop: gutter(4),
  },
});

const workspaceCaptionStyle = css({
  display: 'flex',
  margin: `0 0 ${gutter(2)}`,
  fontSize: FontSize.Regular,
  fontWeight: 'bold',
  alignItems: 'center',
  '&:after': {
    content: '""',
    height: 1,
    marginLeft: gutter(1),
    flex: 1,
    background: Color.LineDefault,
  },
});

const navGroupStyle = css({
  margin: 0,
  padding: `0 0 0 1em`,
  listStyle: 'none',
  '> li + li': {
    marginTop: gutter(2),
  },
});

const groupCaptionStyle = css({
  margin: `0 0 ${gutter(1)}`,
  color: Color.TextSub,
  fontSize: FontSize.Regular,
  textTransform: 'capitalize',
});

const navStyle = css({
  padding: 0,
  listStyle: 'none',
  fontSize: FontSize.Regular,
});

const navItemStyle = css({
  '> a': {
    padding: `${gutter(1)} 0 ${gutter(1)} ${gutter(2)}`,
    ...textEllipsis(),
    display: 'block',
    color: Color.TextDefault,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const navItemActiveStyle = css({
  '> a': {
    color: Color.ActionInverseDefault,
    cursor: 'default',
    pointerEvents: 'none',
    WebkitTextStroke: `1px ${Color.ActionInverseDefault}`,
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

function isActive(
  pathname: string,
  {
    workspace,
    category,
    type,
    name,
  }: {
    workspace: string;
    category: string;
    type: string;
    name: string;
  },
): boolean {
  return pathname === `/${workspace}/${category}/${type}/${name}`;
}

function render({ pathname }: { pathname: string }): VNode {
  return nav(`.${baseStyle}`, [
    header(`.${mastheadStyle}`, [h1(`.event-click-brand-logo.${logoStyle}`, [Icon('brand-logo'), span(['Catalog'])])]),
    div(
      `.${bodyStyle}`,
      Object.keys(examples).map(workspace =>
        div(`.${workspaceStyle}`, [
          h2(`.${workspaceCaptionStyle}`, [`@cyclejs-project/${workspace}`]),
          ul(
            `.${navGroupStyle}`,
            Object.keys(examples[workspace]).map(category =>
              li([
                h3(`.${groupCaptionStyle}`, [category]),
                ul(
                  `.${navGroupStyle}`,
                  Object.keys(examples[workspace][category]).map(type => {
                    const filteredList = Object.keys(examples[workspace][category][type]);
                    return li([
                      h4(`.${groupCaptionStyle}`, [type]),
                      ul(
                        `.${navStyle}`,
                        filteredList.map(name =>
                          li(
                            `.${navItemStyle}`,
                            {
                              class: {
                                [navItemActiveStyle]: isActive(pathname, { workspace, category, type, name }),
                              },
                            },
                            [
                              a(
                                `.event-click-nav-link`,
                                {
                                  attrs: {
                                    href: `/${workspace}/${category}/${type}/${name}`,
                                  },
                                  dataset: {
                                    workspace,
                                    category,
                                    type,
                                    name,
                                  },
                                },
                                [name],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ]);
                  }),
                ),
              ]),
            ),
          ),
        ]),
      ),
    ),
  ]);
}

function Component({ DOM, router }: So): Si {
  const eventClickBrandLogo$: Stream<Event> = DOM.select('.event-click-brand-logo').events('click');
  const eventClickNavLink$: Stream<Event> = DOM.select('.event-click-nav-link')
    .events('click')
    .debug((e: Event) => e.preventDefault());

  const dom$ = router.history$.map(({ pathname }: any) => render({ pathname }));

  return {
    DOM: dom$,
    router: xs.merge(
      eventClickBrandLogo$.mapTo('/'),
      eventClickNavLink$.map(e => {
        const elm = e.target as HTMLAnchorElement;
        return `/${elm.dataset.workspace}/${elm.dataset.category}/${elm.dataset.type}/${elm.dataset.name}`;
      }),
    ),
  };
}

export function Navigation(so: So): Si {
  return isolate<So, Si>(Component)(so);
}
