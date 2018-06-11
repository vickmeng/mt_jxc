import { Action } from 'redux';

export enum OutActionTypes {
  SetTimeRange = '[Out] Set Time Range',

  SetWarehouses = '[Out] Set Warehouses',
  SetWarehousesSuccess = '[Out] Set Warehouses Success',

  SetStockTypes = '[Out] Set StockTypes',
  SetStockTypesSuccess = '[Out] Set StockTypes Success',

  SetQueryParams = '[Out] Set Query Params',
  LoadAll = '[Out] Load All',
  LoadAllSuccess = '[Out] Load All Success',
  LoadAllFail = '[Out] Load All Fail',
}

export interface SetTimeRangeAction extends Action { 
  payload: any;
}

export interface SetWarehousesAction extends Action {
}

export interface SetWarehousesSuccessAction extends Action {
  payload: any[];
}

export interface SetStockTypesAction extends Action {
}

export interface SetStockTypesSuccessAction extends Action {
  payload: any[];
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

export const SetTimeRange = (payload:any): SetTimeRangeAction => ({
  type: OutActionTypes.SetTimeRange,
  payload,
});

export const SetWarehouses = (): SetWarehousesAction => ({
  type: OutActionTypes.SetWarehouses,
});

export const SetWarehousesSuccess = (payload:any[]): SetWarehousesSuccessAction => ({
  type: OutActionTypes.SetWarehousesSuccess,
  payload
});

export const SetStockTypes = (): SetStockTypesAction => ({
  type: OutActionTypes.SetStockTypes,
});

export const SetStockTypesSuccess = (payload:any[]): SetStockTypesSuccessAction => ({
  type: OutActionTypes.SetStockTypesSuccess,
  payload
});

export const LoadAll = (payload:object): LoadAllAction => ({
  type: OutActionTypes.LoadAll,
  payload,
});

export const LoadAllSuccess = (payload: any[]): LoadAllSuccessAction => ({
  type: OutActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: any): LoadAllFailAction => ({
  type: OutActionTypes.LoadAllFail,
  payload,
});

export const SetQueryParams = (payload: any): SetQueryParamsAction => ({
  type: OutActionTypes.SetQueryParams,
  payload,
});

export type OutActionsUnion =
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  | SetWarehousesSuccessAction
  | SetStockTypesSuccessAction
  ;