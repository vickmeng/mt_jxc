import { Action } from 'redux';

import { ErrorResponse } from '@app/shared/models';
import { Dealer } from '../models';

export const enum DealerActionTypes {
  Load = '[Dealer] Load',
  LoadSuccess = '[Dealer] Load Success',
  LoadFail = '[Dealer] Load Fail',
  Update = '[Dealer] Update',
  UpdateSuccess = '[Dealer] Update Success',
  UpdateFail = '[Dealer] Update Fail',
}

export interface LoadAction extends Action { }
export interface LoadSuccessAction extends Action { payload: Dealer; }
export interface LoadFailAction extends Action { payload: ErrorResponse; }

export interface UpdateAction extends Action { payload: Dealer; }
export interface UpdateSuccessAction extends Action { }
export interface UpdateFailAction extends Action { payload: ErrorResponse; }

export const Load = (): LoadAction => ({
  type: DealerActionTypes.Load,
});

export const LoadSuccess = (payload: Dealer): LoadSuccessAction => ({
  type: DealerActionTypes.LoadSuccess,
  payload,
});

export const LoadFail = (payload: ErrorResponse): LoadFailAction => ({
  type: DealerActionTypes.LoadFail,
  payload,
});

export const Update = (payload: Dealer): UpdateAction => ({
  type: DealerActionTypes.Update,
  payload,
});

export const UpdateSuccess = (): UpdateSuccessAction => ({
  type: DealerActionTypes.UpdateSuccess,
});

export const UpdateFail = (payload: ErrorResponse): UpdateFailAction => ({
  type: DealerActionTypes.UpdateFail,
  payload,
});

export type DealerActionsUnion =
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  ;
