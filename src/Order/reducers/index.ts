import { combineReducers, Reducer } from 'redux';
import { createSelector } from 'reselect';

import { State as RootState } from '@app/root';

import * as fromOrderList from './OrderList';
import * as fromOrderListTable from './OrderList/table';
import * as fromOrderListTime from './OrderList/time';

import * as fromOrderDetail from './OrderDetail';
import * as fromOrderDetailData from './OrderDetail/OrderDetail';

export interface State {
  OrderList:fromOrderList.State;
  OrderDetail:fromOrderDetail.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  OrderList:fromOrderList.reducer,
  OrderDetail:fromOrderDetail.reducer,
});

export const getOrderState = (state: RootState): State => state.order;
/*
* Order 订单列表 相关 start
*/
export const getOrderListState = createSelector(
  getOrderState,
  (state: State) => state.OrderList,
);

export const getOrderListTimeState = createSelector(
  getOrderListState,
  (state: fromOrderList.State) => state.time,
);

export const getOrderListTimeRangeState = createSelector(
  getOrderListTimeState,
  fromOrderListTime.getTimeRange
);

export const getOrderListTableDataState = createSelector(
  getOrderListState,
  (state: fromOrderList.State) => state.table,
);

export const getOrderListLoaded = createSelector(
  getOrderListTableDataState,
  fromOrderListTable.getLoaded,
);

export const getOrderListLoading = createSelector(
  getOrderListTableDataState,
  fromOrderListTable.getLoading,
);

export const getOrderListTableData = createSelector(
  getOrderListTableDataState,
  fromOrderListTable.getTableData,
);

export const getOrderListQueryParams = createSelector(
  getOrderListTableDataState,
  fromOrderListTable.getQueryParams,
);

/*
* Order 订单列表 相关 start
*/




/*
* OrderDetail 订单明细 相关 start
*/
export const getOrderDetailState = createSelector(
  getOrderState,
  (state: State) => state.OrderDetail,
);
export const getOrderDetailLoading = createSelector(
  getOrderDetailState,
  fromOrderDetailData.getLoading
);

export const getOrderDetailDetailData = createSelector(
  getOrderDetailState,
  fromOrderDetailData.getDetailData
);

export const getOrderDetailRemarks = createSelector(
  getOrderDetailState,
  fromOrderDetailData.getRemarks
);
/*
* OrderDetail 订单明细 相关 end
*/