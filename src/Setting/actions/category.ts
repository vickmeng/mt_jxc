import { Action } from 'redux';

import { ErrorResponse } from '@app/shared/models';
import { Category, CategoryEntity, CategorySortParams } from '../models';

export const enum CategoryActionTypes {
  LoadAll = '[Category] Load All',
  LoadAllSuccess = '[Category] Load All Success',
  LoadAllFail = '[Category] Load All Fail',
  OpenCreateModal = '[Category] Open Create Modal',
  CloseCreateModal = '[Category] Close Create Modal',
  Create = '[Category] Create',
  CreateSuccess = '[Category] Create Success',
  CreateFail = '[Category] Create Fail',
  OpenUpdateModal = '[Category] Open Update Modal',
  CloseUpdateModal = '[Category] Close Update Modal',
  Update = '[Category] Update',
  UpdateSuccess = '[Category] Update Success',
  UpdateFail = '[Category] Update Fail',
  Delete = '[Category] Delete',
  DeleteSuccess = '[Category] Delete Success',
  DeleteFail = '[Category] Delete Fail',
  ChangeSelectedRowKeys = '[Category] Change Selected Row Keys',
  BatchDelete = '[Category] Batch Delete',
  BatchDeleteSuccess = '[Category] Batch Delete Success',
  BatchDeleteFail = '[Category] Batch Delete Fail',
  Sort = '[Category] Sort',
  SortSuccess = '[Category] Sort Success',
  SortFail = '[Category] Sort Fail',
}

export interface LoadAllAction extends Action { }
export interface LoadAllSuccessAction extends Action { payload: Category[]; }
export interface LoadAllFailAction extends Action { payload: ErrorResponse; }

export interface OpenCreateModalAction extends Action { }
export interface CloseCreateModalAction extends Action { }

export interface CreateAction extends Action { payload: CategoryEntity; }
export interface CreateSuccessAction extends Action { }
export interface CreateFailAction extends Action { payload: ErrorResponse; }

export interface OpenUpdateModalAction extends Action { payload: Category }
export interface CloseUpdateModalAction extends Action { }

export interface UpdateAction extends Action { payload: CategoryEntity; }
export interface UpdateSuccessAction extends Action { }
export interface UpdateFailAction extends Action { payload: ErrorResponse; }

export interface DeleteAction extends Action { payload: number; }
export interface DeleteSuccessAction extends Action { }
export interface DeleteFailAction extends Action { payload: ErrorResponse; }

export interface ChangeSelectedRowKeysAction extends Action { payload: number[]; }

export interface BatchDeleteAction extends Action { payload: number[]; }
export interface BatchDeleteSuccessAction extends Action { }
export interface BatchDeleteFailAction extends Action { payload: ErrorResponse; }

export interface SortAction extends Action { payload: CategorySortParams; }
export interface SortSuccessACtion extends Action { }
export interface SortFailAction extends Action { payload: ErrorResponse; }

export const LoadAll = (): LoadAllAction => ({
  type: CategoryActionTypes.LoadAll,
});

export const LoadAllSuccess = (payload: Category[]): LoadAllSuccessAction => ({
  type: CategoryActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: ErrorResponse): LoadAllFailAction => ({
  type: CategoryActionTypes.LoadAllFail,
  payload,
});

export const OpenCreateModal = (): OpenCreateModalAction => ({
  type: CategoryActionTypes.OpenCreateModal,
});

export const CloseCreateModal = (): CloseCreateModalAction => ({
  type: CategoryActionTypes.CloseCreateModal,
});

export const Create = (payload: CategoryEntity): CreateAction => ({
  type: CategoryActionTypes.Create,
  payload,
});

export const CreateSuccess = (): CreateSuccessAction => ({
  type: CategoryActionTypes.CreateSuccess,
});

export const CreateFail = (payload: ErrorResponse): CreateFailAction => ({
  type: CategoryActionTypes.CreateFail,
  payload,
});

export const OpenUpdateModal = (payload: Category): OpenUpdateModalAction => ({
  type: CategoryActionTypes.OpenUpdateModal,
  payload,
});

export const CloseUpdateModal = (): CloseUpdateModalAction => ({
  type: CategoryActionTypes.CloseUpdateModal,
});

export const Update = (payload: CategoryEntity): UpdateAction => ({
  type: CategoryActionTypes.Update,
  payload,
});

export const UpdateSuccess = (): UpdateSuccessAction => ({
  type: CategoryActionTypes.UpdateSuccess,
});

export const UpdateFail = (payload: ErrorResponse): UpdateFailAction => ({
  type: CategoryActionTypes.UpdateFail,
  payload,
});

export const Delete = (payload: number): DeleteAction => ({
  type: CategoryActionTypes.Delete,
  payload,
});

export const DeleteSuccess = (): DeleteSuccessAction => ({
  type: CategoryActionTypes.DeleteSuccess,
});

export const DeleteFail = (payload: ErrorResponse): DeleteFailAction => ({
  type: CategoryActionTypes.DeleteFail,
  payload,
});

export const ChangeSelectedRowKeys = (payload: number[]): ChangeSelectedRowKeysAction => ({
  type: CategoryActionTypes.ChangeSelectedRowKeys,
  payload,
});

export const BatchDelete = (payload: number[]): BatchDeleteAction => ({
  type: CategoryActionTypes.BatchDelete,
  payload,
});

export const BatchDeleteSuccess = (): BatchDeleteSuccessAction => ({
  type: CategoryActionTypes.BatchDeleteSuccess,
});

export const BatchDeleteFail = (payload: ErrorResponse): BatchDeleteFailAction => ({
  type: CategoryActionTypes.BatchDeleteFail,
  payload,
});

export const Sort = (payload: CategorySortParams): SortAction => ({
  type: CategoryActionTypes.Sort,
  payload,
});

export const SortSuccess = (): SortSuccessACtion => ({
  type: CategoryActionTypes.SortSuccess,
});

export const SortFail = (payload: ErrorResponse): SortFailAction => ({
  type: CategoryActionTypes.SortFail,
  payload,
});

export type CategoryActionsUnion =
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
  | ChangeSelectedRowKeysAction
  | BatchDeleteAction
  | BatchDeleteSuccessAction
  | BatchDeleteFailAction
  | SortAction
  | SortSuccessACtion
  | SortFailAction
  ;
