import { Action } from 'redux';

export enum TransferActionTypes {
  SetTimeRange = '[Transfer] Set Time Range',
  
  SetQueryParams = '[Transfer] Set Query Params',

  LoadAll = '[Transfer] Load All',
  LoadAllSuccess = '[Transfer] Load All Success',
  LoadAllFail = '[Transfer] Load All Fail',
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

export const SetTimeRange = (payload:any): SetTimeRangeAction => ({
  type: TransferActionTypes.SetTimeRange,
  payload,
});

export const LoadAll = (payload:object): LoadAllAction => ({
  type: TransferActionTypes.LoadAll,
  payload,
});

export const LoadAllSuccess = (payload: any[]): LoadAllSuccessAction => ({
  type: TransferActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: any): LoadAllFailAction => ({
  type: TransferActionTypes.LoadAllFail,
  payload,
});

export const SetQueryParams = (payload: any): SetQueryParamsAction => ({
  type: TransferActionTypes.SetQueryParams,
  payload,
});

export type TransferActionsUnion =
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  ;