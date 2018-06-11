import {Reducer } from 'redux';

import * as fromStockCancelModal from './stockCancelModal';
export interface State extends fromStockCancelModal.State{}

export const reducer: Reducer<State> = fromStockCancelModal.reducer;
