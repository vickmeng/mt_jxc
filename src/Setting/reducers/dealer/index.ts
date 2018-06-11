import { combineReducers, Reducer } from 'redux';

import * as fromDetail from './detail';

export interface State {
  detail: fromDetail.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  detail: fromDetail.reducer,
});
