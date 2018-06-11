import { Action } from 'redux';
import {InOutDetailParams} from '../models';

export enum InOutDetailActionTypes {
  SetInOutDetail = '[SetInOutDetail] Set InOut Detail',
  SetInOutDetailSuccess = '[SetInOutDetail] Set InOut Detail Success',
  SetInOutDetailFail = '[SetInOutDetail] Set InOut Detail Fail',
}

export interface SetInOutDetailAction extends Action { 
  payload: InOutDetailParams;
}

export interface SetInOutDetailSuccessAction extends Action { 
  payload: any;
}

export interface SetInOutDetailFailAction extends Action {
  payload: any;
}

export const SetInOutDetail = (payload:InOutDetailParams): SetInOutDetailAction => ({
  type: InOutDetailActionTypes.SetInOutDetail,
  payload,
});

export const SetInOutDetailSuccess = (payload:any): SetInOutDetailSuccessAction => ({
  type: InOutDetailActionTypes.SetInOutDetailSuccess,
  payload,
});

export const SetInOutDetailFail = (payload:any): SetInOutDetailAction => ({
  type: InOutDetailActionTypes.SetInOutDetailFail,
  payload,
});



export type InOutDetailActionsUnion =
  | SetInOutDetailAction
  | SetInOutDetailSuccessAction
  | SetInOutDetailFailAction
;