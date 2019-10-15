import xs, { Stream } from 'xstream';

export type ScrollSink = {
  offsetTop: number;
};

export function makeScrollDriver() {
  return function ScrollDriver(sink$: Stream<ScrollSink>): Stream<string> {
    sink$.addListener({
      next: (sink: ScrollSink) => window.scrollTo(0, sink.offsetTop),
    });
    const stream$ = xs.create<string>();
    window.addEventListener('scroll', () => stream$.shamefullySendNext(`${window.scrollY}px`));
    return stream$;
  };
}
