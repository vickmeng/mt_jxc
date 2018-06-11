import { combineReducers, Reducer } from 'redux';

import * as fromCategories from './category';
import * as fromCreateModal from './createModal';
import * as fromUpdateModal from './updateModal';

export interface State {
  categories: fromCategories.State;
  createModal: fromCreateModal.State;
  updateModal: fromUpdateModal.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  categories: fromCategories.reducer,
  createModal: fromCreateModal.reducer,
  updateModal: fromUpdateModal.reducer,
});
