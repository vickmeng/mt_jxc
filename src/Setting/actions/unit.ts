import { Action } from 'redux';

import { ErrorResponse } from '@app/shared/models';
import { Unit, UnitEntity } from '../models';

export const enum UnitActionTypes {
  LoadAll = '[Unit] Load All',
  LoadAllSuccess = '[Unit] Load Success',
  LoadAllFail = '[Unit] Load Fail',
  OpenCreateModal = '[Unit] Open Create Modal',
  CloseCreateModal = '[Unit] Close Create Modal',
  Create = '[Unit] Create',
  CreateSuccess = '[Unit] Create Success',
  CreateFail = '[Unit] Create Fail',
  OpenUpdateModal = '[Unit] Open Update Modal',
  CloseUpdateModal = '[Unit] Close Update Modal',
  Update = '[Unit] Update',
  UpdateSuccess = '[Unit] Update Success',
  UpdateFail = '[Unit] Update Fail',
  Delete = '[Unit] Delete',
  DeleteSuccess = '[Unit] Delete Success',
  DeleteFail = '[Unit] Delete Fail',
}

export interface LoadAllAction extends Action { }
export interface LoadAllSuccessAction extends Action { payload: Unit[]; }
export interface LoadAllFailAction extends Action { payload: ErrorResponse; }

export interface OpenCreateModalAction extends Action { }
export interface CloseCreateModalAction extends Action { }

export interface CreateAction extends Action { payload: UnitEntity; }
export interface CreateSuccessAction extends Action { }
export interface CreateFailAction extends Action { payload: ErrorResponse; }

export interface OpenUpdateModalAction extends Action { payload: Unit; }
export interface CloseUpdateModalAction extends Action { }

export interface UpdateAction extends Action { payload: UnitEntity; }
export interface UpdateSuccessAction extends Action { }
export interface UpdateFailAction extends Action { payload: ErrorResponse; }

export interface DeleteAction extends Action { payload: number; }
export interface DeleteSuccessAction extends Action { }
export interface DeleteFailAction extends Action { payload: ErrorResponse; }

export const LoadAll = (): LoadAllAction => ({
  type: UnitActionTypes.LoadAll,
});

export const LoadAllSuccess = (payload: Unit[]): LoadAllSuccessAction => ({
  type: UnitActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: ErrorResponse): LoadAllFailAction => ({
  type: UnitActionTypes.LoadAllFail,
  payload,
});

export const OpenCreateModal = (): OpenCreateModalAction => ({
  type: UnitActionTypes.OpenCreateModal,
});

export const CloseCreateModal = (): CloseCreateModalAction => ({
  type: UnitActionTypes.CloseCreateModal,
});

export const Create = (payload: UnitEntity): CreateAction => ({
  type: UnitActionTypes.Create,
  payload,
});

export const CreateSuccess = (): CreateSuccessAction => ({
  type: UnitActionTypes.CreateSuccess,
});

export const CreateFail = (payload: ErrorResponse): CreateFailAction => ({
  type: UnitActionTypes.CreateFail,
  payload,
});

export const OpenUpdateModal = (payload: Unit): OpenUpdateModalAction => ({
  type: UnitActionTypes.OpenUpdateModal,
  payload,
});

export const CloseUpdateModal = (): CloseUpdateModalAction => ({
  type: UnitActionTypes.CloseUpdateModal,
});

export const Update = (payload: UnitEntity): UpdateAction => ({
  type: UnitActionTypes.Update,
  payload,
});

export const UpdateSuccess = (): UpdateSuccessAction => ({
  type: UnitActionTypes.UpdateSuccess,
});

export const UpdateFail = (payload: ErrorResponse): UpdateFailAction => ({
  type: UnitActionTypes.UpdateFail,
  payload,
});

export const Delete = (payload: number): DeleteAction => ({
  type: UnitActionTypes.Delete,
  payload,
});

export const DeleteSuccess = (): DeleteSuccessAction => ({
  type: UnitActionTypes.DeleteSuccess,
});

export const DeleteFail = (payload: ErrorResponse) => ({
  type: UnitActionTypes.DeleteFail,
  payload,
});

export type UnitActionsUnion =
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
  ;
