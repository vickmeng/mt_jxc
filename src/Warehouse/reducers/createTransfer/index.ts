import {Reducer } from 'redux';

import * as fromform from './form';
export interface State extends fromform.State{}

export const reducer: Reducer<State> = fromform.reducer;
