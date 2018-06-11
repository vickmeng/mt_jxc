import { Action } from 'redux';

import { ErrorResponse } from '@app/shared/models';
import { Brand, BrandEntity, BrandSortParams } from '../models';

export const enum BrandActionTypes {
  LoadAll = '[Brand] LoadAll',
  LoadAllSuccess = '[Brand] Load All Success',
  LoadAllFail = '[Brand] Load All Fail',
  OpenCreateModal = '[Brand] Oepn Create Modal',
  CloseCreateModal = '[Brand] Close Create Modal',
  Create = '[Brand] Create',
  CreateSuccess = '[Brand] Create Success',
  CreateFail = '[Brand] Create Fail',
  OpenUpdateModal = '[Brand] Open Update Modal',
  CloseUpdateModal = '[Brand] Close Update Modal',
  Update = '[Brand] Update',
  UpdateSuccess = '[Brand] Update Success',
  UpdateFail = '[Brand] Update Fail',
  Delete = '[Brand] Delete',
  DeleteSuccess = '[Brand] Delete Success',
  DeleteFail = '[Brand] Delete Fail',
  Sort = '[Brand] Sort',
  SortSuccess = '[Brand] Sort Success',
  SortFail = '[Brand] Sort Fail',
}

export interface LoadAllAction extends Action { }
export interface LoadAllSuccessAction extends Action { payload: Brand[]; }
export interface LoadAllFailAction extends Action { payload: ErrorResponse }

export interface OpenCreateModalAction extends Action { }
export interface CloseCreateModalAction extends Action { }

export interface CreateAction extends Action { payload: BrandEntity; }
export interface CreateSuccessAction extends Action { }
export interface CreateFailAction extends Action { payload: ErrorResponse; }

export interface OpenUpdateModalAction extends Action { payload: Brand; }
export interface CloseUpdateModalAction extends Action { }

export interface UpdateAction extends Action { payload: BrandEntity; }
export interface UpdateSuccessAction extends Action { }
export interface UpdateFailAction extends Action { payload: ErrorResponse; }

export interface DeleteAction extends Action { payload: number; }
export interface DeleteSuccessAction extends Action { }
export interface DeleteFailAction extends Action { payload: ErrorResponse; }

export interface SortAction extends Action { payload: BrandSortParams; }
export interface SortSuccessAction extends Action { }
export interface SortFailAction extends Action { payload: ErrorResponse; }

export const LoadAll = (): LoadAllAction => ({
  type: BrandActionTypes.LoadAll,
});

export const LoadAllSuccess = (payload: Brand[]): LoadAllSuccessAction => ({
  type: BrandActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: ErrorResponse): LoadAllFailAction => ({
  type: BrandActionTypes.LoadAllFail,
  payload,
});

export const OpenCreateModal = (): OpenCreateModalAction => ({
  type: BrandActionTypes.OpenCreateModal,
});

export const CloseCreateModal = (): CloseCreateModalAction => ({
  type: BrandActionTypes.CloseCreateModal,
});

export const Create = (payload: BrandEntity): CreateAction => ({
  type: BrandActionTypes.Create,
  payload,
});

export const CreateSuccess = (): CreateSuccessAction => ({
  type: BrandActionTypes.CreateSuccess,
});

export const CreateFail = (payload: ErrorResponse): CreateFailAction => ({
  type: BrandActionTypes.CreateFail,
  payload,
});

export const OpenUpdateModal = (payload: Brand): OpenUpdateModalAction =>({
  type: BrandActionTypes.OpenUpdateModal,
  payload,
});

export const CloseUpdateModal = (): CloseUpdateModalAction => ({
  type: BrandActionTypes.CloseUpdateModal,
});

export const Update = (payload: BrandEntity): UpdateAction => ({
  type: BrandActionTypes.Update,
  payload,
});

export const UpdateSuccess = (): UpdateSuccessAction => ({
  type: BrandActionTypes.UpdateSuccess,
});

export const UpdateFail = (payload: ErrorResponse): UpdateFailAction => ({
  type: BrandActionTypes.UpdateFail,
  payload,
});

export const Delete = (payload: number): DeleteAction => ({
  type: BrandActionTypes.Delete,
  payload,
});

export const DeleteSuccess = (): DeleteSuccessAction => ({
  type: BrandActionTypes.DeleteSuccess,
});

export const DeleteFail = (payload: ErrorResponse) => ({
  type: BrandActionTypes.DeleteFail,
  payload,
});

export const Sort = (payload: BrandSortParams): SortAction => ({
  type: BrandActionTypes.Sort,
  payload,
});

export const SortSuccess = (): SortSuccessAction => ({
  type: BrandActionTypes.SortSuccess,
});

export const SortFail = (payload: ErrorResponse): SortFailAction => ({
  type: BrandActionTypes.SortFail,
  payload,
});

export type BrandActionsUnion =
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
  | UpdateFailAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailAction
  | SortAction
  | SortSuccessAction
  | SortFailAction
  ;
