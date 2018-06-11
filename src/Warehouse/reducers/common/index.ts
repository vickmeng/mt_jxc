import {Reducer } from 'redux';

import * as fromCommon from './common';
export interface State extends fromCommon.State{}

export const reducer: Reducer<State> = fromCommon.reducer;
