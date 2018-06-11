import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import { map, mergeMap, } from 'rxjs/operators';

import { AjaxRequestMethod } from '@app/shared/constants';
import {BrandAPI, CategoryAPI,CommonAPI,ProductAPI, WarehouseAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';

import {
  SetBrandsAction,
  SetBrandsSuccess,

  SetCategoriesAction,
  SetCategoriesSuccess,

  SetProductsAction,
  SetProductsSuccess,
  
  SetStockCodeAction,
  SetStockCodeSuccess,

  SetStockTypesAction,
  SetStockTypesSuccess,

  SetTransferStatusAction,
  SetTransferStatusSuccess,

  SetWarehousesAction,
  SetWarehousesSuccess,

  WarehousecommonActionsUnion,
  WarehousecommonActionTypes,
} from '../actions/common';

const setBrandRequest: AjaxRequest = {
  url: BrandAPI.LoadAll,
  method: AjaxRequestMethod.Get,
};

const setCategoriesRequest: AjaxRequest = {
  url: CategoryAPI.LoadAll,
  method: AjaxRequestMethod.Get,
};

const setProductsRequest: AjaxRequest = {
  body:{
    "pageNo":1,
    "pageSize":10000
  },
  url: ProductAPI.LoadAll,
  method: AjaxRequestMethod.Post,
};

const setWarehouseRequest: AjaxRequest = {
  url: WarehouseAPI.LoadAll,
  method: AjaxRequestMethod.Get,
};

const setStockTypesRequest: AjaxRequest = {
  url: CommonAPI.stockTypes,
  method: AjaxRequestMethod.Get,
};

const setTransferStatusRequest: AjaxRequest = {
  url: CommonAPI.transferStatus,
  method: AjaxRequestMethod.Get,
};

const setStockCodeRequest: AjaxRequest = {
  url: CommonAPI.stockCode,
  method: AjaxRequestMethod.Get,
};

// 品牌
/*tslint:disable:variable-name*/

export const loadBrandsEpic = (action$: ActionsObservable<WarehousecommonActionsUnion>): Observable<WarehousecommonActionsUnion> =>
  action$.pipe(
    ofType(WarehousecommonActionTypes.SetBrands),
    mergeMap((_action: SetBrandsAction) => 
      ajax(setBrandRequest).pipe(
        map(response => response.response),
        map((brands) => SetBrandsSuccess(brands)),
      )
    )
  );

// 分类
export const loadCategoriesEpic = (action$: ActionsObservable<WarehousecommonActionsUnion>): Observable<WarehousecommonActionsUnion> =>
  action$.pipe(
    ofType(WarehousecommonActionTypes.SetCategories),
    mergeMap((_action: SetCategoriesAction) => 
      ajax(setCategoriesRequest).pipe(
        map(response => response.response),
        map((categories) => SetCategoriesSuccess(categories)),
      )
    )
  );

// 商品
export const loadProductsEpic = (action$: ActionsObservable<WarehousecommonActionsUnion>): Observable<WarehousecommonActionsUnion> =>
  action$.pipe(
    ofType(WarehousecommonActionTypes.SetProducts),
    mergeMap((_action: SetProductsAction) => 
      ajax(setProductsRequest).pipe(
        map(response => response.response),
        map((products) => SetProductsSuccess(products.list)),
      )
    )
  );  

// 仓库
export const loadWarehousesEpic = (action$: ActionsObservable<WarehousecommonActionsUnion>): Observable<WarehousecommonActionsUnion> =>
  action$.pipe(
    ofType(WarehousecommonActionTypes.SetWarehouses),
    mergeMap((_action: SetWarehousesAction) => 
      ajax(setWarehouseRequest).pipe(
        map(response => response.response),
        map((warehouses) => SetWarehousesSuccess(warehouses)),
      )
    )
  );

// 类型
export const loadStockTypesEpic = (action$: ActionsObservable<WarehousecommonActionsUnion>): Observable<WarehousecommonActionsUnion> =>
  action$.pipe(
    ofType(WarehousecommonActionTypes.SetStockTypes),
    mergeMap((_action: SetStockTypesAction) => 
      ajax(setStockTypesRequest).pipe(
        map(response => response.response),
        map((StockTypes) => SetStockTypesSuccess(StockTypes)),
      )
    )
  );

// 调拨状态
export const loadTransferStatusEpic = (action$: ActionsObservable<WarehousecommonActionsUnion>): Observable<WarehousecommonActionsUnion> =>
  action$.pipe(
    ofType(WarehousecommonActionTypes.SetTransferStatus),
    mergeMap((_action: SetTransferStatusAction) => 
      ajax(setTransferStatusRequest).pipe(
        map(response => response.response),
        map((TransferStatus) => SetTransferStatusSuccess(TransferStatus)),
      )
    )
);

// 调拨状态
export const loadStockCodeEpic = (action$: ActionsObservable<WarehousecommonActionsUnion>): Observable<WarehousecommonActionsUnion> =>
  action$.pipe(
    ofType(WarehousecommonActionTypes.SetStockCode),
    mergeMap((_action: SetStockCodeAction) => 
      ajax(setStockCodeRequest).pipe(
        map(response => response.response),
        map((res) => SetStockCodeSuccess(res.stockCode)),
      )
    )
);