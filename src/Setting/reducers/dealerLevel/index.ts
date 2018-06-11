import { combineReducers, Reducer } from 'redux';

import * as fromCreateModal from './createModal';
import * as fromDealerLevels from './dealerLevel';
import * as fromUpdateModal from './updateModal';

export interface State {
  dealerLevels: fromDealerLevels.State;
  createModal: fromCreateModal.State;
  updateModal: fromUpdateModal.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  dealerLevels: fromDealerLevels.reducer,
  createModal: fromCreateModal.reducer,
  updateModal: fromUpdateModal.reducer,
});
