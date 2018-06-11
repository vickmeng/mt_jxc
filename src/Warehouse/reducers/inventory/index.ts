import { combineReducers, Reducer } from 'redux';

import * as fromInventories from './inventory';

export interface State {
  inventories: fromInventories.State,
}

export const reducer: Reducer<State> = combineReducers<State>({
  inventories: fromInventories.reducer,
});
