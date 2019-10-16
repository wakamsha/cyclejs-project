export type PartyType = 'otherParty' | 'ownParty';

export enum Severity {
  Mute = 0,
  Normal = 1,
  Critical = 2,
}

export enum DrawerMenuExpanded {
  False = '0',
  True = '1',
}

export enum LocalStorageKeys {
  DrawerMenuExpanded = 'DRAWER_MENU_EXPANDED',
}

export enum SearchType {
  ArticleSearch = 'article-search',
  DocumentSearch = 'document-search',
}

export enum DocumentType {
  Inspectable = 'inspectable',
  ArticleSearchable = 'article-searchable',
}

export enum DocumentSource {
  Customer = 'customer',
  LegalForce = 'legalforce',
  Both = 'both',
}

export enum Color {
  BrandPrimary = '#565964',
  BrandInverse = '#D2397C',

  // Domain
  DomainInspection = '#4C99B2',
  DomainLibrary = '#A14FB8',

  // Actions
  ActionPrimaryDefault = '#7E808C',
  ActionPrimaryLight = '#616474',
  ActionPrimaryLighter = '#E3E3E7',
  ActionPrimaryDark = '#656772',
  ActionInverseDefault = '#D2397C',
  ActionInverseLight = '#C71060',
  ActionInverseDark = '#970847',
  ActionInverseLighter = '#FCDEEC',

  // Statuses
  StatusPrimaryDefault = '#BFC1C9',
  StatusPrimaryLight = '#E3E3E7',
  StatusPrimaryDark = '#474A5E',
  StatusWarningDefault = '#E39441',
  StatusWarningLight = '#FBEFE2',
  StatusWarningDark = '#F4D4B3',
  StatusSuccessDefault = '#4C99B2',
  StatusSuccessLight = '#DCF2F9',
  StatusSuccessDark = '#117394',
  StatusDangerDefault = '#D2397C',
  StatusDangerLight = '#FCDEEC',
  StatusDangerDark = '#970847',
  StatusDisabled = '#D6D9DF',

  // Text
  TextDefault = '#474A5E',
  TextSub = '#808d96',
  TextPlaceholder = '#D6D9DF',

  // Symbols
  SymbolNotification = '#D2397C',
  SymbolReview = '#4C99B2',
  SymbolLibrary = '#A14FB8',

  // Line
  LineDefault = '#BFC1C9',
  LineDark = '#7E808C',
  LineLight = '#E3E3E7',

  // Texture
  TextureBody = '#FBFBFC',
  TextureInput = '#F6F6F8',
  TextureBackdrop = '#E3E4E8',
  TextureActive = '#e3e4e8',
  TexturePaper = '#F9F9FA',

  // Highlight
  HighlightArticle = '#C5D5D6',
  HighlightSuccessLight = '#E2EAEB',
  HighlightSuccessDark = '#B9CDCE',

  // Bar
  Bar1 = '#481344',
  Bar2 = '#902788',
  Bar3 = '#D43EC9',
  Bar4 = '#E17EDA',
  Bar5 = '#F0BEED',
}

export enum FontSize {
  Tiny = '11px',
  Small = '12px',
  Regular = '14px',
  Medium = '16px',
  Large = '18px',
  Huge = '20px',
}

export enum LineHeight {
  Compressed = 1.4,
  Regular = 1.6,
  Medium = 1.8,
}

export enum IconSize {
  Small = '16px',
  Regular = '20px',
  Large = '24px',
  Huge = '32px',
}

export enum Duration {
  Fade = '0.15s',
  Enter = '0.25s',
  Leave = '0.3s',
}

export enum Easing {
  Enter = 'cubic-bezier(.11, .57, .14, 1)',
  Leave = 'cubic-bezier(0, .14, .75, 1)',
  Filter = 'cubic-bezier(0, 2.5, 0.2, 2.5)',
}

export enum FontFamily {
  Default = '"Noto Sans Japanese", "メイリオ", Meiryo, sans-serif',
  Serif = '"Noto Serif Japanese", serif',
  Monospace = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
}

export enum Breakpoint {
  ScreenXs = 480,
  ScreenSm = 768,
  ScreenMd = 992,
  ScreenLg = 1200,
  ScreenXl = 1600,
}

export enum BorderRadius {
  Small = '2px',
  Regular = '5px',
  Medium = '8px',
  Circle = '999rem',
}

export enum ZIndex {
  GlobalHeader = 10,
  Popup = 50,
  PageHeader = 60,
  DrawerMenu = 70,
  Modal = 100,
  GlobalProgress = 1000,
  Notification = 1100,
  Tooltip = 1200,
  Intercom = 2147483000,
}

export namespace Shadow {
  export const Neutral = `0 1px 4px 0 rgba(0, 0, 0, .2)`;
  export const Floating = `0 1px 8px 0 rgba(0, 0, 0, .2)`;
  export const Dialog = `0 10px 40px 0 rgba(0, 0, 0, .2)`;
  export const Hover = `0 8px 12px 0 rgba(0, 0, 0, .3)`;
}

export namespace Dimension {
  export const Gutter = 8;
  export const DrawerMenuWidth = 80;
  export const DrawerMenuWidthExpanded = 260;
  export const GlobalHeaderHeight = 56;
  export const DocumentShowPageHeaderHeight = 64;
  export const InspectionShowPageTabsHeight = 42;
  export const PageFullHeight = 'calc(100vh - 48px)';
  export const PageContentHeight = 'calc(100vh - 96px)';
}

export namespace MediaQuery {
  export const MinWidthXs = `@media (min-width: ${Breakpoint.ScreenXs}px)`;
  export const MinWidthSm = `@media (min-width: ${Breakpoint.ScreenSm}px)`;
  export const MinWidthMd = `@media (min-width: ${Breakpoint.ScreenMd}px)`;
  export const MinWidthLg = `@media (min-width: ${Breakpoint.ScreenLg}px)`;
  export const MinWidthXl = `@media (min-width: ${Breakpoint.ScreenXl}px)`;
}

export namespace SupportsQuery {
  export const ObjectFit = `@supports (object-fit: cover)`;
}

export type ColorTheme = 'neutral' | 'inspection' | 'library';
export type Vertical = 'top' | 'bottom';
export type Horizontal = 'left' | 'center' | 'right';

export type ReviewJudgement = 'ng' | 'miss';

export type FileType = 'word' | 'pdf' | 'image';
