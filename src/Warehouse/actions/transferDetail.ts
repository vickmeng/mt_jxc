import { Action } from 'redux';
import {TransferDetailParams} from '../models';

export enum TransferDetailActionTypes {
  SetTransferDetail = '[TransferDetail] Set Transfer Detail',
  SetTransferDetailSuccess = '[TransferDetail] Set Transfer Detail Success',
  SetTransferDetailFail = '[TransferDetail] Set Transfer Detail Fail',

  SetTransferOperatelog = '[TransferOperatelog] Set Transfer Operatelog',
  SetTransferOperatelogSuccess = '[TransferOperatelog] Set Transfer Operatelog Success',
  SetTransferOperatelogFail = '[TransferOperatelog] Set Transfer Operatelog Fail',
}

export interface SetTransferDetailAction extends Action { 
  payload: TransferDetailParams;
}

export interface SetTransferDetailSuccessAction extends Action { 
  payload: any;
}

export interface SetTransferDetailFailAction extends Action {
  payload: any;
}

export interface SetTransferOperatelogAction extends Action { 
  payload: TransferDetailParams;
}

export interface SetTransferOperatelogSuccessAction extends Action { 
  payload: any;
}

export interface SetTransferOperatelogFailAction extends Action {
  payload: any;
}

export const SetTransferDetail = (payload:TransferDetailParams): SetTransferDetailAction => ({
  type: TransferDetailActionTypes.SetTransferDetail,
  payload,
});

export const SetTransferDetailSuccess = (payload:any): SetTransferDetailSuccessAction => ({
  type: TransferDetailActionTypes.SetTransferDetailSuccess,
  payload,
});

export const SetTransferDetailFail = (payload:any): SetTransferDetailAction => ({
  type: TransferDetailActionTypes.SetTransferDetailFail,
  payload,
});


export const SetTransferOperatelog = (payload:TransferDetailParams): SetTransferOperatelogAction => ({
  type: TransferDetailActionTypes.SetTransferOperatelog,
  payload,
});

export const SetTransferOperatelogSuccess = (payload:any): SetTransferOperatelogSuccessAction => ({
  type: TransferDetailActionTypes.SetTransferOperatelogSuccess,
  payload,
});

export const SetTransferOperatelogFail = (payload:any): SetTransferOperatelogAction => ({
  type: TransferDetailActionTypes.SetTransferOperatelogFail,
  payload,
});


export type TransferDetailActionsUnion =
  | SetTransferDetailAction
  | SetTransferDetailSuccessAction
  | SetTransferDetailFailAction

  | SetTransferOperatelogAction
  | SetTransferOperatelogSuccessAction
  | SetTransferOperatelogFailAction
;