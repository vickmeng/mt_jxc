import { Action } from 'redux';

import { ErrorResponse, TableChangeData, TableData } from '@app/shared/models';
import { Warehouse, WarehouseEntity, WarehouseStatus } from '../models';

export const enum WarehouseActionTypes {
  LoadAll = '[Warehouse] Load All',
  LoadAllSuccess = '[Warehouse] Load All Success',
  LoadAllFail = '[Warehouse] Load All Fail',
  ChangeTable = '[Warehouse] Change Table',
  OpenCreateModal = '[Warehouse] Open Create Modal',
  CloseCreateModal = '[Warehouse] Close Create Modal',
  Create = '[Warehouse] Create',
  CreateSuccess = '[Warehouse] Create Success',
  CreateFail = '[Warehouse] Create Fail',
  OpenUpdateModal = '[Warehouse] Open Update Modal',
  CloseUpdateModal = '[Warehouse] Close Update Modal',
  Update = '[Warehouse] Update',
  UpdateSuccess = '[Warehouse] Update Success',
  UpdateFail = '[Warehouse] Update Fail',
  Delete = '[Warehouse] Delete',
  DeleteSuccess = '[Warehouse] Delete Success',
  DeleteFail = '[Warehouse] Delete Fail',
  SetDefault = '[Warehouse] Set Default',
  SetDefaultSuccess = '[Warehouse] Set Default Success',
  SetDefaultFail = '[Warehouse] Set Default Fail',
  SetStatus = '[Warehouse] Set Status',
  SetStatusSuccess = '[Warehouse] Set Status Success',
  SetStatusFail = '[Warehouse] Set Status Fail',
}

export interface LoadAllAction extends Action { }
export interface LoadAllSuccessAction extends Action { payload: TableData<Warehouse>; }
export interface LoadAllFailAction extends Action { payload: ErrorResponse; }

export interface ChangeTableAction extends Action { payload: TableChangeData; }

export interface OpenCreateModalAction extends Action { }
export interface CloseCreateModalAction extends Action { }

export interface CreateAction extends Action { payload: WarehouseEntity; }
export interface CreateSuccessAction extends Action { }
export interface CreateFailAction extends Action { payload: ErrorResponse; }

export interface OpenUpdateModalAction extends Action { payload: Warehouse; }
export interface CloseUpdateModalAction extends Action { }

export interface UpdateAction extends Action { payload: WarehouseEntity; }
export interface UpdateSuccessAction extends Action { }
export interface UpdateFailAction extends Action { payload: ErrorResponse; }

export interface DeleteAction extends Action { payload: number; }
export interface DeleteSuccessAction extends Action { }
export interface DeleteFailAction extends Action { payload: ErrorResponse; }

export interface SetDefaultAction extends Action { payload: number; }
export interface SetDefaultSuccessAction extends Action { }
export interface SetDefaultFailAction extends Action { payload: ErrorResponse; }

export interface SetStatusAction extends Action { payload: WarehouseStatus; }
export interface SetStatusSuccessAction extends Action { }
export interface SetStatusFailAction extends Action { payload: ErrorResponse; }

export const LoadAll = (): LoadAllAction => ({
  type: WarehouseActionTypes.LoadAll,
});

export const LoadAllSuccess = (payload: TableData<Warehouse>): LoadAllSuccessAction => ({
  type: WarehouseActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: ErrorResponse): LoadAllFailAction => ({
  type: WarehouseActionTypes.LoadAllFail,
  payload,
});

export const ChangeTable = (payload: TableChangeData): ChangeTableAction => ({
  type: WarehouseActionTypes.ChangeTable,
  payload,
});

export const OpenCreateModal = (): OpenCreateModalAction => ({
  type: WarehouseActionTypes.OpenCreateModal,
});

export const CloseCreateModal = (): CloseCreateModalAction => ({
  type: WarehouseActionTypes.CloseCreateModal,
});

export const Create = (payload: WarehouseEntity): CreateAction => ({
  type: WarehouseActionTypes.Create,
  payload,
});

export const CreateSuccess = (): CreateSuccessAction => ({
  type: WarehouseActionTypes.CreateSuccess,
});

export const CreateFail = (payload: ErrorResponse): CreateFailAction => ({
  type: WarehouseActionTypes.CreateFail,
  payload,
});

export const OpenUpdateModal = (payload: Warehouse): OpenUpdateModalAction => ({
  type: WarehouseActionTypes.OpenUpdateModal,
  payload,
});

export const CloseUpdateModal = (): CloseUpdateModalAction => ({
  type: WarehouseActionTypes.CloseUpdateModal,
});

export const Update = (payload: WarehouseEntity): UpdateAction => ({
  type: WarehouseActionTypes.Update,
  payload,
});

export const UpdateSuccess = (): UpdateSuccessAction => ({
  type: WarehouseActionTypes.UpdateSuccess,
});

export const UpdateFail = (payload: ErrorResponse): UpdateFailAction => ({
  type: WarehouseActionTypes.UpdateFail,
  payload,
});

export const Delete = (payload: number): DeleteAction => ({
  type: WarehouseActionTypes.Delete,
  payload,
});

export const DeleteSuccess = (): DeleteSuccessAction => ({
  type: WarehouseActionTypes.DeleteSuccess,
});

export const DeleteFail = (payload: ErrorResponse): DeleteFailAction => ({
  type: WarehouseActionTypes.DeleteFail,
  payload,
});

export const SetDefault = (payload: number): SetDefaultAction => ({
  type: WarehouseActionTypes.SetDefault,
  payload,
});

export const SetDefaultSuccess = (): SetDefaultSuccessAction => ({
  type: WarehouseActionTypes.SetDefaultSuccess,
});

export const SetDefaultFail = (payload: ErrorResponse): SetDefaultFailAction => ({
  type: WarehouseActionTypes.SetDefaultFail,
  payload,
});

export const SetStatus = (payload: WarehouseStatus): SetStatusAction => ({
  type: WarehouseActionTypes.SetStatus,
  payload,
});

export const SetStatusSuccess = (): SetStatusSuccessAction => ({
  type: WarehouseActionTypes.SetDefaultSuccess,
});

export const SetStatusFail = (payload: ErrorResponse): SetStatusFailAction => ({
  type: WarehouseActionTypes.SetStatusFail,
  payload,
});

export type WarehouseActionsUnion =
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  | ChangeTableAction
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
  | SetDefaultAction
  | SetDefaultSuccessAction
  | SetDefaultFailAction
  | SetStatusAction
  | SetStatusSuccessAction
  | SetStatusFailAction
  ;