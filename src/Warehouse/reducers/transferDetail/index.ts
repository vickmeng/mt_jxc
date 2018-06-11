import {Reducer } from 'redux';

import * as fromTransferDetail from './transferDetail';
export interface State extends fromTransferDetail.State{}

export const reducer: Reducer<State> = fromTransferDetail.reducer;
