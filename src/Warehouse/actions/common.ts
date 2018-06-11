import { Action } from 'redux';

export enum WarehousecommonActionTypes {
  SetBrands = '[Warehousecommon] Set Brands',
  SetBrandsSuccess = '[Warehousecommon] Set Brands Success',

  SetCategories = '[Warehousecommon] Set Categories',
  SetCategoriesSuccess = '[Warehousecommon] Set Categories Success',

  SetProducts = '[Warehousecommon] Set Products',
  SetProductsSuccess = '[Warehousecommon] Set Products Success',

  SetWarehouses = '[Warehousecommon] Set Warehouses',
  SetWarehousesSuccess = '[Warehousecommon] Set Warehouses Success',

  SetStockTypes = '[Warehousecommon] Set StockTypes',
  SetStockTypesSuccess = '[Warehousecommon] Set StockTypes Success',

  SetTransferStatus = '[Warehousecommon] Set TransferStatus',
  SetTransferStatusSuccess = '[Warehousecommon] Set TransferStatus Success',

  SetStockCode = '[Warehousecommon] Set StockCode',
  SetStockCodeSuccess = '[Warehousecommon] Set StockCode Success',
  
}

export interface SetBrandsAction extends Action {
}

export interface SetBrandsSuccessAction extends Action {
  payload: any[];
}


export interface SetCategoriesAction extends Action {
}

export interface SetCategoriesSuccessAction extends Action {
  payload: any[];
}

export interface SetProductsAction extends Action {
}

export interface SetProductsSuccessAction extends Action {
  payload: any[];
}

export interface SetWarehousesAction extends Action {
}

export interface SetWarehousesSuccessAction extends Action {
  payload: any[];
}

export interface SetStockTypesAction extends Action {
}

export interface SetStockTypesSuccessAction extends Action {
  payload: any[];
}

export interface SetTransferStatusAction extends Action {
}

export interface SetTransferStatusSuccessAction extends Action {
  payload: any[];
}

export interface SetStockCodeAction extends Action {
}

export interface SetStockCodeSuccessAction extends Action {
  payload: string;
}

export const SetBrands = (): SetBrandsAction => ({
  type: WarehousecommonActionTypes.SetBrands,
});

export const SetBrandsSuccess = (payload:any[]): SetBrandsSuccessAction => ({
  type: WarehousecommonActionTypes.SetBrandsSuccess,
  payload
});


export const SetProducts = (): SetProductsAction => ({
  type: WarehousecommonActionTypes.SetProducts,
});

export const SetProductsSuccess = (payload:any[]): SetProductsSuccessAction => ({
  type: WarehousecommonActionTypes.SetProductsSuccess,
  payload
});

export const SetCategories = (): SetCategoriesAction => ({
  type: WarehousecommonActionTypes.SetCategories,
});

export const SetCategoriesSuccess = (payload:any[]): SetCategoriesSuccessAction => ({
  type: WarehousecommonActionTypes.SetCategoriesSuccess,
  payload
});


export const SetWarehouses = (): SetWarehousesAction => ({
  type: WarehousecommonActionTypes.SetWarehouses,
});

export const SetWarehousesSuccess = (payload:any[]): SetWarehousesSuccessAction => ({
  type: WarehousecommonActionTypes.SetWarehousesSuccess,
  payload
});

export const SetStockTypes = (): SetStockTypesAction => ({
  type: WarehousecommonActionTypes.SetStockTypes,
});

export const SetStockTypesSuccess = (payload:any[]): SetStockTypesSuccessAction => ({
  type: WarehousecommonActionTypes.SetStockTypesSuccess,
  payload
});

export const SetTransferStatus = (): SetTransferStatusAction => ({
  type: WarehousecommonActionTypes.SetTransferStatus,
});

export const SetTransferStatusSuccess = (payload:any[]): SetTransferStatusSuccessAction => ({
  type: WarehousecommonActionTypes.SetTransferStatusSuccess,
  payload
});

export const SetStockCode = (): SetStockCodeAction => ({
  type: WarehousecommonActionTypes.SetStockCode,
});

export const SetStockCodeSuccess = (payload:string): SetStockCodeSuccessAction => ({
  type: WarehousecommonActionTypes.SetStockCodeSuccess,
  payload
});


export type WarehousecommonActionsUnion =
  | SetBrandsAction
  | SetBrandsSuccessAction
  | SetCategoriesAction
  | SetCategoriesSuccessAction
  | SetProductsAction
  | SetProductsSuccessAction
  | SetWarehousesAction
  | SetWarehousesSuccessAction
  | SetStockTypesAction
  | SetStockTypesSuccessAction
  | SetTransferStatusAction
  | SetTransferStatusSuccessAction
  | SetStockCodeSuccessAction
  ;