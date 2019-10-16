import { ScrollSink } from './ScrollDriver';
import { SiDOM, SiRouter, SoDOM, SoRouter } from '@cyclejs-project/core/drivers/interface';
import { Stream } from 'xstream';

export type SoScroll = { Scroll: Stream<string> };

export type SiScroll = { Scroll?: Stream<ScrollSink> };

export type SoAll = SoDOM & SoRouter & SoScroll;
export type SiAll = SiDOM & SiRouter & SiScroll;
