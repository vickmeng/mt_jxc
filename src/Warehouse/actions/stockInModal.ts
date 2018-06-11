import { Action } from 'redux';

import {
  StockInModalParams,
  StockInParams ,
 } from '../models'

export enum StockInActionTypes {
  OpenModal = '[Transfer StockIn] Open Modal',
  CloseModal = '[Transfer StockIn] Close Modal',
  StockIn = '[Transfer StockIn] Create InOut',
  StockInSuccess = '[Transfer StockIn] Create InOut Success',
  StockInFail = '[Transfer StockIn] Create InOut Fail',

}

export interface OpenModalAction extends Action {
  payload: any;
}

export interface CloseModalAction extends Action { 
}

export interface StockInAction extends Action { 
  payload: StockInParams;
}

export interface StockInSuccessAction extends Action { 
}

export interface StockInFailAction extends Action {
  payload: any;
}

export const OpenModal = (payload:StockInModalParams): OpenModalAction => ({
  type: StockInActionTypes.OpenModal,
  payload
});

export const CloseModal = (): CloseModalAction => ({
  type: StockInActionTypes.CloseModal,
});

export const StockIn = (payload:StockInParams): StockInAction => ({
  type: StockInActionTypes.StockIn,
  payload,
});

export const StockInSuccess = (): StockInSuccessAction => ({
  type: StockInActionTypes.StockInSuccess
});

export const StockInFail = (payload:any): StockInFailAction => ({
  type: StockInActionTypes.StockInFail,
  payload,
});

export type StockInActionsUnion =
  | OpenModalAction
  | StockInAction
  | StockInSuccessAction
  | StockInFailAction
  ;