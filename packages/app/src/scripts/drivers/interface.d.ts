import { DOMSource } from '@cycle/dom/lib/cjs/rxjs';
import { Observable } from 'rxjs';
import { VNode } from '@cycle/dom';

export type SoDOM = { DOM: DOMSource };

export type SiDOM = { DOM: Observable<VNode> };

export type SoAll = SoDOM;
export type SiAll = SiDOM;
