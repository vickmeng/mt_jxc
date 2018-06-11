import { Action } from 'redux';

import {
  StockCancelModalParams,
  StockCancelParams ,
 } from '../models'

export enum StockCancelActionTypes {
  OpenModal = '[Transfer StockCancel] Open Modal',
  CloseModal = '[Transfer StockCancel] Close Modal',
  StockCancel = '[Transfer StockCancel] Stock CancelOut',
  StockCancelSuccess = '[Transfer StockCancel] Stock Cancel Success',
  StockCancelFail = '[Transfer StockCancel] Stock Cancel Fail',

}

export interface OpenModalAction extends Action {
  payload: StockCancelModalParams;
}

export interface CloseModalAction extends Action { 
}

export interface StockCancelAction extends Action { 
  payload: StockCancelParams;
}

export interface StockCancelSuccessAction extends Action { 
}

export interface StockCancelFailAction extends Action {
  payload: any;
}

export const OpenModal = (payload:StockCancelModalParams): OpenModalAction => ({
  type: StockCancelActionTypes.OpenModal,
  payload
});

export const CloseModal = (): CloseModalAction => ({
  type: StockCancelActionTypes.CloseModal,
});

export const StockCancel = (payload:StockCancelParams): StockCancelAction => ({
  type: StockCancelActionTypes.StockCancel,
  payload,
});

export const StockCancelSuccess = (): StockCancelSuccessAction => ({
  type: StockCancelActionTypes.StockCancelSuccess
});

export const StockCancelFail = (payload:any): StockCancelFailAction => ({
  type: StockCancelActionTypes.StockCancelFail,
  payload,
});

export type StockCancelActionsUnion =
  | OpenModalAction
  | StockCancelAction
  | StockCancelSuccessAction
  | StockCancelFailAction
  ;