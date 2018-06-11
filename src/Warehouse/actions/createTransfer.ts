import { Action } from 'redux';

import {CreateTransferParams} from '../models'

export enum CreateTransferActionTypes {
  CreateTransfer = '[CreateTransfer] Create Transfer',
  CreateTransferSuccess = '[CreateTransfer] Create Transfer Success',
  CreateTransferFail = '[CreateTransfer] Create Transfer Fail',

}

export interface CreateTransferAction extends Action { 
  payload: any;
}

export interface CreateTransferSuccessAction extends Action { 
}

export interface CreateTransferFailAction extends Action {
  payload: any;
}

export const CreateTransfer = (payload:CreateTransferParams): CreateTransferAction => ({
  type: CreateTransferActionTypes.CreateTransfer,
  payload,
});

export const CreateTransferSuccess = (): CreateTransferSuccessAction => ({
  type: CreateTransferActionTypes.CreateTransferSuccess
});

export const CreateTransferFail = (payload:any): CreateTransferFailAction => ({
  type: CreateTransferActionTypes.CreateTransferFail,
  payload,
});



export type CreateTransferActionsUnion =
  | CreateTransferAction
  | CreateTransferSuccessAction
  | CreateTransferFailAction
  ;