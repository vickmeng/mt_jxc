import { Action } from 'redux';

import {CreateInOutParams} from '../models'

export enum CreateInOutActionTypes {
  CreateInOut = '[CreateInOut] Create InOut',
  CreateInOutSuccess = '[CreateInOut] Create InOut Success',
  CreateInOutFail = '[CreateInOut] Create InOut Fail',

}

export interface CreateInOutAction extends Action { 
  payload: any;
}

export interface CreateInOutSuccessAction extends Action { 
}

export interface CreateInOutFailAction extends Action {
  payload: any;
}

export const CreateInOut = (payload:CreateInOutParams): CreateInOutAction => ({
  type: CreateInOutActionTypes.CreateInOut,
  payload,
});

export const CreateInOutSuccess = (): CreateInOutSuccessAction => ({
  type: CreateInOutActionTypes.CreateInOutSuccess
});

export const CreateInOutFail = (payload:any): CreateInOutFailAction => ({
  type: CreateInOutActionTypes.CreateInOutFail,
  payload,
});



export type CreateInOutActionsUnion =
  | CreateInOutAction
  | CreateInOutSuccessAction
  | CreateInOutFailAction
  ;