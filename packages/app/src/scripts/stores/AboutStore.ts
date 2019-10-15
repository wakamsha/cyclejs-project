import { Action } from '../interface';
import { assoc } from 'ramda';

export type Store = {
  bmi: number;
};

export const initialStore: Readonly<Store> = {
  bmi: 0,
};

export function makeUpdateBMIAction(h: number, w: number): Action<Store> {
  const heightMeters = h * 0.01;
  const bmi = Math.round(w / (heightMeters * heightMeters));
  return assoc('bmi', bmi);
}
