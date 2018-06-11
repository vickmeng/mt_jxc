import {Reducer } from 'redux';

import * as fromOrderDetail from './OrderDetail';
export interface State extends fromOrderDetail.State{}

export const reducer: Reducer<State> = fromOrderDetail.reducer;
