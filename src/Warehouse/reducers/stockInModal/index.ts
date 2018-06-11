import {Reducer } from 'redux';

import * as fromStockInModal from './stockInModal';
export interface State extends fromStockInModal.State{}

export const reducer: Reducer<State> = fromStockInModal.reducer;
