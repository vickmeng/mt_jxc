import { combineReducers, Reducer } from 'redux'; 

import * as fromCreateModal from './createModal';
import * as fromUnits from './unit';
import * as fromUpdateModal from './updateModal';

export interface State {
  units: fromUnits.State;
  createModal: fromCreateModal.State;
  updateModal: fromUpdateModal.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  units: fromUnits.reducer,
  createModal: fromCreateModal.reducer,
  updateModal: fromUpdateModal.reducer,
});
