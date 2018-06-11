import { Action } from 'redux';

export enum InventoryActionTypes {
  LoadAll = '[Inventory] Load All',
  LoadAllSuccess = '[Inventory] Load All Success',
  LoadAllFail = '[Inventory] Load All Fail',
  UpdataPagination = '[Inventory] Updata Pagination',
  SetQueryParams = '[Inventory] Set Query Params',
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

export const LoadAll = (payload:object): LoadAllAction => ({
  type: InventoryActionTypes.LoadAll,
  payload,
});

export const LoadAllSuccess = (payload: any): LoadAllSuccessAction => ({
  type: InventoryActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: any): LoadAllFailAction => ({
  type: InventoryActionTypes.LoadAllFail,
  payload,
});

export const SetQueryParams = (payload: any): SetQueryParamsAction => ({
  type: InventoryActionTypes.SetQueryParams,
  payload,
});




export type InventoryActionsUnion =
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  ;