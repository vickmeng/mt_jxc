import { combineReducers, Reducer } from 'redux';

import * as fromCreateModal from './createModal';
import * as fromUpdateModal from './updateModal';
import * as fromWarehouses from './warehouse';

export interface State {
  warehouses: fromWarehouses.State;
  createModal: fromCreateModal.State;
  updateModal: fromUpdateModal.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  warehouses: fromWarehouses.reducer,
  createModal: fromCreateModal.reducer,
  updateModal: fromUpdateModal.reducer,
});
