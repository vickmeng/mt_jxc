import { combineReducers, Reducer } from 'redux';

import * as fromTable from './table';
import * as fromTime from './time';

export interface State {
  time: fromTime.State,
  table:fromTable.State
}

export const reducer: Reducer<State> = combineReducers<State>({
    time: fromTime.reducer,
    table: fromTable.reducer,
});
