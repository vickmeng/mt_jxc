import { Action } from 'redux';

import { UploadFile } from 'antd/lib/upload/interface';

import { ColumnData, ErrorResponse, TableChangeData, TableData } from '@app/shared/models';
import {
  Dealer,
  DealerLevelPrice,
  DealerPrice,
  NumberablePayload,
  OnShelfParams,
  Product,
  ProductEntity,
  ProductFormValues,
  SelectDealerPayload,
} from '../models';

export const enum ProductActionTypes {
  LoadAll = '[Product] Load All',
  LoadAllSuccess = '[Product] Load All Success',
  LoadAllFail = '[Product] Load All Fail',
  ChangeTable = '[Product] Change Table',
  ChangeSelectedRowKeys = '[Product] Change Selected Row Keys',
  ChangeTableColumn = '[Product] Change Table Column',
  OpenOnShelfModal = '[Product] Open On Shelf Modal',
  CloseOnShelfModal = '[Product] Close On Shelf Modal',
  BatchSetStatus = '[Product] Batch Set Status',
  BatchSetStatusSuccess = '[Product] Batch Set Status Success',
  BatchSetStatusFail = '[Product] Batch Set Status Fail',
  BatchDelete = '[Product] Batch Delete',
  BatchDeleteSuccess = '[Product] Batch Delete Success',
  BatchDeleteFail = '[Product] Batch Delete Fail',
  OpenImagePreview = '[Product] Open Image Preivew',
  CloseImagePreview = '[Product] Close Image Preview',
  UpdateImageList = '[Product] Update Image List',
  UpdateDescription = '[Product] Update Description',
  UpdateDocumentList = '[Product] Update Document List',
  UpdatePrice = '[Product] Update Price',
  UpdateDealerLevelPriceList = '[Product] Update Dealer Level Price List',
  UpdateDealerPriceList = '[Product] Update Dealer Price List',
  UpdateDealerLevelAllowPurchase = '[Product] Update Dealer Level Allow Purchase',
  UpdateDealerLevelOrderPrice = '[Product] Update Dealer Level Order Price',
  UpdateDealerLevelOrderCost = '[Product] Update Dealer Level Order Cost',
  ToggleHasDealerPrice = '[Product] Toggle Has Dealer Price',
  LoadAllDealer = '[Dealer] Load All Dealer',
  LoadAllDealerSuccess = '[Dealer] Load All Dealer Success',
  LoadAllDealerFail = '[Dealer] Load All Dealer Fail',
  UpdateDealerAllowPurchase = '[Product] Update Dealer Allow Purchase',
  UpdateDealerOrderPrice = '[Product] Update Dealer Order Price',
  UpdateDealerOrderCost = '[Product] Update Dealer Order Cost',
  AddDealerPrice = '[Product] Add Dealer Price',
  RemoveDealerPrice = '[Product] Remove Dealer Price',
  SelectDealer = '[Product] Select Dealer',
  ResetSelectDealer = '[Product] Reset Select Dealer',
  Create = '[Product] Create',
  CreateSuccess = '[Product] Create Success',
  CreateFail = '[Product] Create Fail',
  Update = '[Product] Update',
  UpdateSuccess = '[Product] Update Success',
  UpdateFail = '[Product] Update Fail',
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail',
}

export interface LoadAllAction extends Action { }
export interface LoadAllSuccessAction extends Action { payload: TableData<Product>; }
export interface LoadAllFailAction extends Action { payload: ErrorResponse; }

export interface ChangeTableAction extends Action { payload: TableChangeData; }
export interface ChangeSelectedRowKeysAction extends Action { payload: number[]; }
export interface ChangeTableColumnAction extends Action { payload: Array<ColumnData<Product>>; }

export interface OpenOnShelfModalAction extends Action { }
export interface CloseOnShelfModalAction extends Action { }

export interface BatchSetStatusAction extends Action { payload: OnShelfParams; }
export interface BatchSetStatusSuccessAction extends Action { }
export interface BatchSetStatusFailAction extends Action { payload: ErrorResponse; }

export interface BatchDeleteAction extends Action { payload: number[]; }
export interface BatchDeleteSuccessAction extends Action { }
export interface BatchDeleteFailAction extends Action { payload: ErrorResponse; }

export interface OpenImagePreviewAction extends Action { payload: string; }
export interface CloseImagePreviewAction extends Action { }

export interface UpdateImageListAction extends Action { payload: UploadFile[]; }
export interface UpdateDescriptionAction extends Action { payload: string; }
export interface UpdateDocumentListAction extends Action { payload: UploadFile[]; }

export interface UpdatePriceAction extends Action { payload: number; }
export interface UpdateDealerLevelPriceListAction extends Action { payload: DealerLevelPrice[]; }
export interface UpdateDealerPriceListAction extends Action { payload: DealerPrice[]; }

export interface UpdateDealerLevelPriceAllowPurchaseAction extends Action { payload: number; }
export interface UpdateDealerLevelOrderPriceAction extends Action { payload: NumberablePayload; }
export interface UpdateDealerLevelOrderCostAction extends Action { payload: NumberablePayload; }

export interface ToggleHasDealerPriceAction extends Action { }

export interface LoadAllDealerAction extends Action { }
export interface LoadAllDealerSuccessAction extends Action { payload: Dealer[]; }
export interface LoadAllDealerFailAction extends Action { payload: ErrorResponse; }

export interface UpdateDealerPriceAllowPurchaseAction extends Action { payload: number; }
export interface UpdateDealerOrderPriceAction extends Action { payload: NumberablePayload; }
export interface UpdateDealerOrderCostAction extends Action { payload: NumberablePayload; }

export interface AddDealerPriceAction extends Action { payload: number; }
export interface RemoveDealerPriceAction extends Action { payload: number; }
export interface SelectDealerAction extends Action { payload: SelectDealerPayload; }
export interface ResetSelectDealerAction extends Action { payload: number; }

export interface CreateAction extends Action { payload: ProductFormValues; }
export interface CreateSuccessAction extends Action { }
export interface CreateFailAction extends Action { payload: ErrorResponse; }

export interface UpdateAction extends Action { payload: ProductFormValues; }
export interface UpdateSuccessAction extends Action { }
export interface UpdateFailAction extends Action { payload: ErrorResponse; }

export interface LoadAction extends Action { payload: number; }
export interface LoadSuccessAction extends Action { payload: ProductEntity; }
export interface LoadFailAction extends Action { payload: ErrorResponse; }

export const LoadAll = (): LoadAllAction => ({
  type: ProductActionTypes.LoadAll,
});

export const LoadAllSuccess = (payload: TableData<Product>): LoadAllSuccessAction => ({
  type: ProductActionTypes.LoadAllSuccess,
  payload,
});

export const LoadAllFail = (payload: ErrorResponse): LoadAllFailAction => ({
  type: ProductActionTypes.LoadAllFail,
  payload,
});

export const ChangeTable = (payload: TableChangeData): ChangeTableAction => ({
  type: ProductActionTypes.ChangeTable,
  payload,
});

export const ChangeSelectedRowKeys = (payload: number[]): ChangeSelectedRowKeysAction => ({
  type: ProductActionTypes.ChangeSelectedRowKeys,
  payload,
});

export const ChangeTableColumn = (payload: Array<ColumnData<Product>>): ChangeTableColumnAction => ({
  type: ProductActionTypes.ChangeTableColumn,
  payload,
});

export const OpenOnShelfModal = (): OpenOnShelfModalAction => ({
  type: ProductActionTypes.OpenOnShelfModal,
});

export const CloseOnShelfModal = (): CloseOnShelfModalAction => ({
  type: ProductActionTypes.CloseOnShelfModal,
});

export const BatchSetStatus = (payload: OnShelfParams): BatchSetStatusAction => ({
  type: ProductActionTypes.BatchSetStatus,
  payload,
});

export const BatchSetStatusSuccess = (): BatchSetStatusSuccessAction => ({
  type: ProductActionTypes.BatchSetStatusSuccess,
});

export const BatchSetStatusFail = (payload: ErrorResponse): BatchSetStatusFailAction => ({
  type: ProductActionTypes.BatchSetStatusFail,
  payload,
});

export const BatchDelete = (payload: number[]): BatchDeleteAction => ({
  type: ProductActionTypes.BatchDelete,
  payload,
});

export const BatchDeleteSuccess = (): BatchDeleteSuccessAction => ({
  type: ProductActionTypes.BatchDeleteSuccess,
});

export const BatchDeleteFail = (payload: ErrorResponse): BatchDeleteFailAction => ({
  type: ProductActionTypes.BatchDeleteFail,
  payload,
});

export const OpenImagePreview = (payload: string): OpenImagePreviewAction => ({
  type: ProductActionTypes.OpenImagePreview,
  payload,
});

export const CloseImagePreview = (): CloseImagePreviewAction => ({
  type: ProductActionTypes.CloseImagePreview,
});

export const UpdateImageList = (payload: UploadFile[]): UpdateImageListAction => ({
  type: ProductActionTypes.UpdateImageList,
  payload,
});

export const UpdateDescription = (payload: string): UpdateDescriptionAction => ({
  type: ProductActionTypes.UpdateDescription,
  payload,
});

export const UpdateDocumentList = (payload: UploadFile[]): UpdateDocumentListAction => ({
  type: ProductActionTypes.UpdateDocumentList,
  payload,
});

export const UpdatePrice = (payload: number): UpdatePriceAction => ({
  type: ProductActionTypes.UpdatePrice,
  payload,
});

export const UpdateDealerLevelPriceList = (payload: DealerLevelPrice[]): UpdateDealerLevelPriceListAction => ({
  type: ProductActionTypes.UpdateDealerLevelPriceList,
  payload,
});

export const UpdateDealerPriceList = (payload: DealerPrice[]): UpdateDealerPriceListAction => ({
  type: ProductActionTypes.UpdateDealerPriceList,
  payload,
});

export const UpdateDealerLevelPriceAllowPurchase = (payload: number): UpdateDealerLevelPriceAllowPurchaseAction => ({
  type: ProductActionTypes.UpdateDealerLevelAllowPurchase,
  payload,
});

export const UpdateDealerLevelOrderPrice = (payload: NumberablePayload): UpdateDealerLevelOrderPriceAction => ({
  type: ProductActionTypes.UpdateDealerLevelOrderPrice,
  payload,
});

export const UpdateDealerLevelOrderCost = (payload: NumberablePayload): UpdateDealerLevelOrderCostAction => ({
  type: ProductActionTypes.UpdateDealerLevelOrderCost,
  payload,
});

export const ToggleHasDealerPrice = (): ToggleHasDealerPriceAction => ({
  type: ProductActionTypes.ToggleHasDealerPrice,
});

export const LoadAllDealer = (): LoadAllDealerAction => ({
  type: ProductActionTypes.LoadAllDealer,
});

export const LoadAllDealerSuccess = (payload: Dealer[]): LoadAllDealerSuccessAction => ({
  type: ProductActionTypes.LoadAllDealerSuccess,
  payload,
});

export const LoadAllDealerFail = (payload: ErrorResponse): LoadAllDealerFailAction => ({
  type: ProductActionTypes.LoadAllDealerFail,
  payload,
});

export const UpdateDealerPriceAllowPurchase = (payload: number): UpdateDealerPriceAllowPurchaseAction => ({
  type: ProductActionTypes.UpdateDealerAllowPurchase,
  payload,
});

export const UpdateDealerOrderPrice = (payload: NumberablePayload): UpdateDealerOrderPriceAction => ({
  type: ProductActionTypes.UpdateDealerOrderPrice,
  payload,
});

export const UpdateDealerOrderCost = (payload: NumberablePayload): UpdateDealerOrderCostAction => ({
  type: ProductActionTypes.UpdateDealerOrderCost,
  payload,
});

export const AddDealerPrice = (payload: number): AddDealerPriceAction => ({
  type: ProductActionTypes.AddDealerPrice,
  payload,
});

export const RemoveDealerPrice = (payload: number): RemoveDealerPriceAction => ({
  type: ProductActionTypes.RemoveDealerPrice,
  payload,
});

export const SelectDealer = (payload: SelectDealerPayload): SelectDealerAction => ({
  type: ProductActionTypes.SelectDealer,
  payload,
});

export const ResetSelectDealer = (payload: number): ResetSelectDealerAction => ({
  type: ProductActionTypes.ResetSelectDealer,
  payload,
});

export const Create = (payload: ProductFormValues): CreateAction => ({
  type: ProductActionTypes.Create,
  payload,
});

export const CreateSuccess = (): CreateSuccessAction => ({
  type: ProductActionTypes.CreateSuccess,
});

export const CreateFail = (payload: ErrorResponse): CreateFailAction => ({
  type: ProductActionTypes.CreateFail,
  payload,
});

export const Update = (payload: ProductFormValues): UpdateAction => ({
  type: ProductActionTypes.Update,
  payload,
});

export const UpdateSuccess = (): UpdateSuccessAction => ({
  type: ProductActionTypes.UpdateSuccess,
});

export const UpdateFail = (payload: ErrorResponse): UpdateFailAction => ({
  type: ProductActionTypes.UpdateFail,
  payload,
});

export const Load = (payload: number): LoadAction => ({
  type: ProductActionTypes.Load,
  payload,
});

export const LoadSuccess = (payload: ProductEntity): LoadSuccessAction => ({
  type: ProductActionTypes.LoadSuccess,
  payload,
});

export const LoadFail= (payload: ErrorResponse): LoadFailAction => ({
  type: ProductActionTypes.LoadFail,
  payload,
});

export type ProductActionsUnion =
  | LoadAllAction
  | LoadAllSuccessAction
  | LoadAllFailAction
  | ChangeTableAction
  | ChangeSelectedRowKeysAction
  | ChangeTableColumnAction
  | OpenOnShelfModalAction
  | CloseOnShelfModalAction
  | BatchSetStatusAction
  | BatchSetStatusSuccessAction
  | BatchSetStatusFailAction
  | BatchDeleteAction
  | BatchDeleteSuccessAction
  | BatchDeleteFailAction
  | OpenImagePreviewAction
  | CloseImagePreviewAction
  | UpdateImageListAction
  | UpdateDescriptionAction
  | UpdateDocumentListAction
  | UpdatePriceAction
  | UpdateDealerLevelPriceListAction
  | UpdateDealerPriceListAction
  | UpdateDealerLevelPriceAllowPurchaseAction
  | UpdateDealerLevelOrderPriceAction
  | UpdateDealerLevelOrderCostAction
  | ToggleHasDealerPriceAction
  | LoadAllDealerAction
  | LoadAllDealerSuccessAction
  | LoadAllDealerFailAction
  | UpdateDealerPriceAllowPurchaseAction
  | UpdateDealerOrderPriceAction
  | UpdateDealerOrderCostAction
  | AddDealerPriceAction
  | RemoveDealerPriceAction
  | SelectDealerAction
  | ResetSelectDealerAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailAction
  | UpdateAction
  | UpdateSuccessAction
  | UpdateFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  ;
