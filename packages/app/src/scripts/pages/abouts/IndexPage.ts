import { Action } from 'src/scripts/interface';
import { LabeledSlider } from 'src/scripts/components/LabeledSlider';
import { SiAll, SoAll } from 'src/scripts/drivers/interface';
import { Store, initialStore, makeUpdateBMIAction } from 'src/scripts/stores/AboutStore';
import { VNode, button, div, h1, hr, p } from '@cycle/dom';
import xs, { Stream } from 'xstream';

function render({ bmi, hSliderDOM, wSliderDOM }: { bmi: number; hSliderDOM: VNode; wSliderDOM: VNode }): VNode {
  return div([h1(['About']), hSliderDOM, wSliderDOM, p([bmi]), hr(), button('.event-click-go-home', ['Home >>'])]);
}

export class AboutIndexPage {
  public main({ DOM }: SoAll): SiAll {
    const eventClickGoHome$: Stream<Event> = DOM.select('.event-click-go-home').events('click');

    const heightSlider = LabeledSlider({
      DOM,
      props: {
        label: 'Height',
        unit: 'cm',
        min: 140,
        max: 220,
        init: 140,
      },
    });

    const weightSlider = LabeledSlider({
      DOM,
      props: {
        label: 'Weight',
        unit: 'kg',
        min: 40,
        max: 150,
        init: 60,
      },
    });

    const store$: Stream<Store> = xs
      .combine(heightSlider.value$, weightSlider.value$)
      .map(([h, w]) => makeUpdateBMIAction(h, w))
      .fold((acc: Store, action: Action<Store>) => action(acc), initialStore);

    const dom$ = xs
      .combine(store$, weightSlider.DOM, heightSlider.DOM)
      .map(([{ bmi }, wSliderDOM, hSliderDOM]) => render({ bmi, wSliderDOM, hSliderDOM }));
    const router$ = eventClickGoHome$.mapTo('/');

    return {
      DOM: dom$,
      router: router$,
    };
  }
}
