import { DOMSource, VNode } from '@cycle/dom/lib/cjs';
import { RouterSource } from 'cyclic-router';
import { Stream } from 'xstream';

export type SoDOM = { DOM: DOMSource };
export type SoRouter = { router: RouterSource };

export type SiDOM = { DOM: Stream<VNode> };
export type SiRouter = { router: Stream<string> };

export type SoAll = SoDOM & SoRouter;
export type SiAll = SiDOM & SiRouter;
