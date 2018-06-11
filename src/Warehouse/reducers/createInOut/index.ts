import {Reducer } from 'redux';

import * as fromCreateInOut from './createInOut';
export interface State extends fromCreateInOut.State{}

export const reducer: Reducer<State> = fromCreateInOut.reducer;
