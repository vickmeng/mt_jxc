import { Action } from 'redux';

export enum OrderListActionTypes {
  SetTimeRange = '[OrderList] Set Time Range',
  
  SetQueryParams = '[OrderList] Set Query Params',

  LoadAll = '[OrderList] Load All',
  LoadAllSuccess = '[OrderList] Load All Success',
  LoadAllFail = '[OrderList] Load All Fail',

  OrderSK = '[OrderList] Order SK',
  OrderSKSuccess = '[OrderList] Order SK Success',
  OrderSKFail = '[OrderList] Order SK Fail',
}

export interface SetTimeRangeAction extends Action { 
  payload: any;
}

export interface LoadAllAction extends Action { 
  payload: any;
}

export interface LoadAllSuccessAction extends Action {
  payload: any;
}

export interface LoadAllFailAction extends Action {
  payload: any;
}
export interface SetQueryParamsAction extends Action {
  payload: any;
}

export interface OrderSKAction extends Action { 
  payload: any;
}

export interface OrderSKSuccessAction extends Action {
  payload: any;
}

export interface OrderSKFailAction extends Action {
  payload: any;
}



export const SetTimeRange = (payload:any): SetTimeRangeAction => ({
  type: OrderListActionTypes.SetTimeRange,
  payload,
});

export const LoadAll = (payload:object): LoadAllAction => ({
  type: OrderListActionTypes.LoadAll,
  payload,
});

export const LoadAllSuccess = (payload: any[]): LoadAllSuccessAction => ({
  type: OrderListActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: any): LoadAllFailAction => ({
  type: OrderListActionTypes.LoadAllFail,
  payload,
});

export const OrderSK = (payload:object): OrderSKAction => ({
  type: OrderListActionTypes.OrderSK,
  payload,
});

export const OrderSKSuccess = (payload: any[]): OrderSKSuccessAction => ({
  type: OrderListActionTypes.OrderSKSuccess,
  payload,
});

export const OrderSKFail = (payload: any): OrderSKFailAction => ({
  type: OrderListActionTypes.OrderSKFail,
  payload,
});



export const SetQueryParams = (payload: any): SetQueryParamsAction => ({
  type: OrderListActionTypes.SetQueryParams,
  payload,
});

export type OrderListActionsUnion =
  | OrderSKAction
  | OrderSKSuccessAction
  | OrderSKFailAction
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  | SetQueryParamsAction
  ;