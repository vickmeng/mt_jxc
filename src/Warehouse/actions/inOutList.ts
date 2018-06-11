import { Action } from 'redux';

export enum InOutListActionTypes {
  SetTimeRange = '[InOutList] Set Time Range',
  
  SetQueryParams = '[InOutList] Set Query Params',

  LoadAll = '[InOutList] Load All',
  LoadAllSuccess = '[InOutList] Load All Success',
  LoadAllFail = '[InOutList] Load All Fail',
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
  type: InOutListActionTypes.SetTimeRange,
  payload,
});

export const LoadAll = (payload:object): LoadAllAction => ({
  type: InOutListActionTypes.LoadAll,
  payload,
});

export const LoadAllSuccess = (payload: any[]): LoadAllSuccessAction => ({
  type: InOutListActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: any): LoadAllFailAction => ({
  type: InOutListActionTypes.LoadAllFail,
  payload,
});

export const SetQueryParams = (payload: any): SetQueryParamsAction => ({
  type: InOutListActionTypes.SetQueryParams,
  payload,
});

export type InOutListActionsUnion =
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  ;