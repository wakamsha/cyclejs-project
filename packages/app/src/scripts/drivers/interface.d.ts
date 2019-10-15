import { DOMSource, VNode } from '@cycle/dom/lib/cjs';
import { RouterSource } from 'cyclic-router';
import { ScrollSink } from './ScrollDriver';
import { Stream } from 'xstream';

export type SoDOM = { DOM: DOMSource };
export type SoRouter = { router: RouterSource };
export type SoScroll = { Scroll: Stream<string> };

export type SiDOM = { DOM: Stream<VNode> };
export type SiRouter = { router: Stream<string> };
export type SiScroll = { Scroll?: Stream<ScrollSink> };

export type SoAll = SoDOM & SoRouter & SoScroll;
export type SiAll = SiDOM & SiRouter & SiScroll;
