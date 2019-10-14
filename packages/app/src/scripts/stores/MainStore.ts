import { Action } from '../interface';
import { assoc } from 'ramda';

export type Store = {
  name: string;
};

export const initialStore: Readonly<Store> = {
  name: '',
};

export function makeUpdateNameAction(name: string): Action<Store> {
  return assoc('name', name);
}
