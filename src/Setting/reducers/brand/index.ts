import { combineReducers, Reducer } from 'redux';

import * as fromBrands from './brand';
import * as fromCreateModal from './createModal';
import * as fromUpdateModal from './updateModal';

export interface State {
  brands: fromBrands.State;
  createModal: fromCreateModal.State;
  updateModal: fromUpdateModal.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  brands: fromBrands.reducer,
  createModal: fromCreateModal.reducer,
  updateModal: fromUpdateModal.reducer,
});