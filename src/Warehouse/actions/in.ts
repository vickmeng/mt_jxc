import { Action } from 'redux';

export enum InActionTypes {
  SetTimeRange = '[In] Set Time Range',
  
  SetQueryParams = '[In] Set Query Params',

  LoadAll = '[In] Load All',
  LoadAllSuccess = '[In] Load All Success',
  LoadAllFail = '[In] Load All Fail',
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
  type: InActionTypes.SetTimeRange,
  payload,
});

export const LoadAll = (payload:object): LoadAllAction => ({
  type: InActionTypes.LoadAll,
  payload,
});

export const LoadAllSuccess = (payload: any[]): LoadAllSuccessAction => ({
  type: InActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: any): LoadAllFailAction => ({
  type: InActionTypes.LoadAllFail,
  payload,
});

export const SetQueryParams = (payload: any): SetQueryParamsAction => ({
  type: InActionTypes.SetQueryParams,
  payload,
});

export type InActionsUnion =
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  ;