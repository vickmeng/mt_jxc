import {Reducer } from 'redux';

import * as fromInOutDetail from './inOutDetail';
export interface State extends fromInOutDetail.State{}

export const reducer: Reducer<State> = fromInOutDetail.reducer;
