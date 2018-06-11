import { push } from 'react-router-redux';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { forkJoin, Observable, of } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { State } from '@app/root';
import { AjaxRequestMethod } from '@app/shared/constants';
import { ProductAPI } from '@app/shared/constants/api';
import { ErrorResponse, TableData } from '@app/shared/models';
import { ajax } from '@app/shared/utils';

import * as fromProduct from '../reducers';

import {
  BatchDeleteAction,
  BatchDeleteFail,
  BatchDeleteSuccess,
  BatchSetStatusAction,
  BatchSetStatusFail,
  BatchSetStatusSuccess,
  CreateAction,
  CreateFail,
  CreateSuccess,
  LoadAction,
  LoadAll,
  LoadAllFail,
  LoadAllSuccess,
  LoadFail,
  LoadSuccess,
  ProductActionsUnion,
  ProductActionTypes,
} from '../actions/product';
import { Product, ProductInfo, ProductPrice } from '../models';
import { getProductParams } from '../utils';

const loadPageRequest: AjaxRequest = {
  url: ProductAPI.LoadPage,
  method: AjaxRequestMethod.Post,
};

export const loadProductsPageEpic = (action$: ActionsObservable<ProductActionsUnion>, state$: StateObservable<State>): Observable<ProductActionsUnion> =>
  action$.pipe(
    ofType(ProductActionTypes.LoadAll, ProductActionTypes.ChangeTable),
    switchMap(() => {
      const pagination = fromProduct.getProductPagination(state$.value);
      return ajax({
        ...loadPageRequest,
        body: { pageNo: pagination.current, pageSize: pagination.pageSize },
      }).pipe(
        map((response: AjaxResponse) => response.response),
        map((products: TableData<Product>) => LoadAllSuccess(products)),
        catchError((err: ErrorResponse) => of(LoadAllFail(err))),
      )
    })
  );

const batchSetStatusequest: AjaxRequest = {
  url: ProductAPI.SetStatus,
  method: AjaxRequestMethod.Put,
};

export const batchSetProductStatusEpic = (action$: ActionsObservable<ProductActionsUnion>): Observable<ProductActionsUnion> =>
  action$.pipe(
    ofType(ProductActionTypes.BatchSetStatus),
    switchMap((action: BatchSetStatusAction) =>
      ajax({
        ...batchSetStatusequest,
        body: action.payload,
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(BatchSetStatusSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(BatchSetStatusFail(err))),
      )
    )
  );

const batchDeleteRequest: AjaxRequest = {
  url: ProductAPI.Base,
  method: AjaxRequestMethod.Delete,
};

export const batchDeleteProductEpic = (action$: ActionsObservable<ProductActionsUnion>): Observable<ProductActionsUnion> =>
  action$.pipe(
    ofType(ProductActionTypes.BatchDelete),
    mergeMap((action: BatchDeleteAction) => 
      ajax({
        ...batchDeleteRequest,
        body: { productIds: action.payload },
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(BatchDeleteSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(BatchDeleteFail(err))),
      )
    )
  );

const createRequest: AjaxRequest = {
  url: ProductAPI.Base,
  method: AjaxRequestMethod.Post,
};

export const createProductEpic = (action$: ActionsObservable<ProductActionsUnion>, state$: StateObservable<State>): Observable<ProductActionsUnion> =>
  action$.pipe(
    ofType(ProductActionTypes.Create),
    switchMap((action: CreateAction) => {
      return ajax({
        ...createRequest,
        body: getProductParams(action.payload, fromProduct.getEntityState(state$.value)),
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(CreateSuccess(), push('/product/list'))),
        catchError((err: ErrorResponse) => of(CreateFail(err))),
      )
    })
  );

const loadInfoRequest: AjaxRequest = {
  url: ProductAPI.Base,
  method: AjaxRequestMethod.Get,
};

const loadPriceRequest: AjaxRequest = {
  url: ProductAPI.LoadPrice,
  method: AjaxRequestMethod.Get,
};

export const loadProductEpic = (action$: ActionsObservable<ProductActionsUnion>): Observable<ProductActionsUnion> =>
  action$.pipe(
    ofType(ProductActionTypes.Load),
    mergeMap((action: LoadAction) => 
      forkJoin(
        ajax({
          ...loadInfoRequest,
          url: `${loadInfoRequest.url}/${action.payload}`
        }),
        ajax({
          ...loadPriceRequest,
          url: `${loadPriceRequest.url}/${action.payload}`
        }),
      )
      .pipe(
        map((response: AjaxResponse[]) => response.map(res => res.response)),
        map(([ basic, price ]: [ ProductInfo, ProductPrice[] ]) => LoadSuccess({ basic, price })),
        catchError((err: ErrorResponse) => of(LoadFail(err))),
      )
    )
  );