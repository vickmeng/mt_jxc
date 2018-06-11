import { combineReducers, Reducer } from 'redux';

import * as fromDescription from './description';
import * as fromDocuments from './document';
import * as fromForm from './form';
import * as fromImages from './image';
import * as fromPrice from './price';

export interface State {
  images: fromImages.State;
  description: string;
  price: fromPrice.State;
  documents: fromDocuments.State;
  form: fromForm.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  images: fromImages.reducer,
  description: fromDescription.reducer,
  price: fromPrice.reducer,
  documents: fromDocuments.reducer,
  form: fromForm.reducer,
});