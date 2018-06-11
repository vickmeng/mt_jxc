import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';

import * as fromLayout from '@app/layout/reducers';
import * as fromOrder from '@app/Order/reducers';
import * as fromProduct from '@app/Product/reducers';
import * as fromSetting from '@app/Setting/reducers';
import * as fromWarehouse from '@app/Warehouse/reducers'

export interface State {
  router: RouterState;
  order:fromOrder.State;
  layout: fromLayout.State;
  product: fromProduct.State;
  setting: fromSetting.State;
  warehouse: fromWarehouse.State
}

export const rootReducer: Reducer<State> = combineReducers<State>({
  router: routerReducer,
  order:fromOrder.reducer,
  layout: fromLayout.reducer,
  product: fromProduct.reducer,
  setting: fromSetting.reducer,
  warehouse: fromWarehouse.reducer,
});