import { Action } from 'redux';

import { ErrorResponse } from '@app/shared/models';
import { DealerLevel, DealerLevelEntity, DealerLevelSortParams } from '../models';

export const enum DealerLevelActionTypes {
  LoadAll = '[Dealer Level] Load All',
  LoadAllSuccess = '[Dealer Level] Load All Success',
  LoadAllFail = '[Dealer Level] Load All Fail',
  OpenCreateModal = '[Dealer Level] Open Create Modal',
  CloseCreateModal = '[Dealer Level] Close Create Modal',
  Create = '[Dealer Level] Create',
  CreateSuccess = '[Dealer Level] Create Success',
  CreateFail = '[Dealer Level] Create Fail',
  OpenUpdateModal = '[Dealer Level] Open Update Modal',
  CloseUpdateModal = '[Dealer Level] Close Update Modal',
  Update = '[Dealer Level] Update',
  UpdateSuccess = '[Dealer Level] Update Success',
  UpdateFail = '[Dealer Level] Update Fail',
  Delete = '[Dealer Level] Delete',
  DeleteSuccess = '[Dealer Level] Delete Success',
  DeleteFail = '[Dealer Level] Delete Fail',
  Sort = '[Dearler Level] Sort',
  SortSuccess = '[Dealer Level] Sort Success',
  SortFail = '[Dealer Level] Sort Fail',
}

export interface LoadAllAction extends Action { }
export interface LoadAllSuccessAction extends Action { payload: DealerLevel[]; }
export interface LoadAllFailAction extends Action { payload: ErrorResponse; }

export interface OpenCreateModalAction extends Action { }
export interface CloseCreateModalAction extends Action { }

export interface CreateAction extends Action { payload: DealerLevelEntity; }
export interface CreateSuccessAction extends Action { }
export interface CreateFailAction extends Action { payload: ErrorResponse; }

export interface OpenUpdateModalAction extends Action { payload: DealerLevel; }
export interface CloseUpdateModalAction extends Action { }

export interface UpdateAction extends Action { payload: DealerLevelEntity; }
export interface UpdateSuccessAction extends Action { }
export interface UpdateFailaction extends Action { payload: ErrorResponse; }

export interface DeleteAction extends Action { payload: number; }
export interface DeleteSuccessAction extends Action { }
export interface DeleteFailAction extends Action { payload: ErrorResponse; }

export interface SortAction extends Action { payload: DealerLevelSortParams; }
export interface SortSuccessAction extends Action { }
export interface SortFailAction extends Action { payload: ErrorResponse; }

export const LoadAll = (): LoadAllAction => ({
  type: DealerLevelActionTypes.LoadAll,
});

export const LoadAllSuccess = (payload: DealerLevel[]) => ({
  type: DealerLevelActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: ErrorResponse) => ({
  type: DealerLevelActionTypes.LoadAllFail,
  payload,
});

export const OpenCreateModal = (): OpenCreateModalAction => ({
  type: DealerLevelActionTypes.OpenCreateModal,
});

export const CloseCreateModal = (): CloseCreateModalAction => ({
  type: DealerLevelActionTypes.CloseCreateModal,
});

export const Create = (payload: DealerLevelEntity): CreateAction => ({
  type: DealerLevelActionTypes.Create,
  payload,
});

export const CreateSuccess = (): CreateSuccessAction => ({
  type: DealerLevelActionTypes.CreateSuccess,
});

export const CreateFail = (payload: ErrorResponse): CreateFailAction => ({
  type: DealerLevelActionTypes.CreateFail,
  payload,
});

export const OpenUpdateModal = (payload: DealerLevel): OpenUpdateModalAction => ({
  type: DealerLevelActionTypes.OpenUpdateModal,
  payload,
});

export const CloseUpdateModal = (): CloseUpdateModalAction => ({
  type: DealerLevelActionTypes.CloseUpdateModal,
});

export const Update = (payload: DealerLevelEntity): UpdateAction => ({
  type: DealerLevelActionTypes.Update,
  payload,
});

export const UpdateSuccess = (): UpdateSuccessAction => ({
  type: DealerLevelActionTypes.UpdateSuccess,
});

export const UpdateFail = (payload: ErrorResponse): UpdateFailaction => ({
  type: DealerLevelActionTypes.UpdateFail,
  payload,
});

export const Delete = (payload: number): DeleteAction => ({
  type: DealerLevelActionTypes.Delete,
  payload,
});

export const DeleteSuccess = (): DeleteSuccessAction => ({
  type: DealerLevelActionTypes.DeleteSuccess,
});

export const DeleteFail = (payload: ErrorResponse): DeleteFailAction => ({
  type: DealerLevelActionTypes.DeleteFail,
  payload,
});

export const Sort = (payload: DealerLevelSortParams): SortAction => ({
  type: DealerLevelActionTypes.Sort,
  payload,
});

export const SortSuccess = (): SortSuccessAction => ({
  type: DealerLevelActionTypes.SortSuccess,
});

export const SortFail = (payload: ErrorResponse): SortFailAction => ({
  type: DealerLevelActionTypes.SortFail,
  payload,
});

export type DealerLevelActionsUnion =
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  | OpenCreateModalAction
  | CloseCreateModalAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailAction
  | OpenUpdateModalAction
  | CloseUpdateModalAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailaction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | SortAction
  | SortSuccessAction
  | SortFailAction
  ;
