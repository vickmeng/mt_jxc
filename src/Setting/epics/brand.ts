import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { message } from 'antd';

import { AjaxRequestMethod } from '@app/shared/constants';
import { BrandAPI } from '@app/shared/constants/api';
import { ErrorResponse } from '@app/shared/models';
import { ajax } from '@app/shared/utils';

import {
  BrandActionsUnion,
  BrandActionTypes,
  CreateAction,
  CreateFail,
  CreateSuccess,
  DeleteAction,
  DeleteFail,
  DeleteSuccess,
  LoadAll,
  LoadAllFail,
  LoadAllSuccess,
  SortAction,
  SortFail,
  SortSuccess,
  UpdateAction,
  UpdateFail,
  UpdateSuccess,
} from '../actions/brand';
import { Brand } from '../models';

const loadAllRequest: AjaxRequest = {
  url: BrandAPI.LoadAll,
  method: AjaxRequestMethod.Get,
};

export const loadBransEpic = (action$: ActionsObservable<BrandActionsUnion>): Observable<BrandActionsUnion> =>
  action$.pipe(
    ofType(BrandActionTypes.LoadAll),
    switchMap(() => 
      ajax(loadAllRequest).pipe(
        map((response: AjaxResponse) => response.response),
        map((brands: Brand[]) => LoadAllSuccess(brands)),
        catchError((err: ErrorResponse) => of(LoadAllFail(err))),
      )
    )
  );

const createRequest: AjaxRequest = {
  url: BrandAPI.Base,
  method: AjaxRequestMethod.Post,
};

export const createBransEpic = (action$: ActionsObservable<BrandActionsUnion>): Observable<BrandActionsUnion> =>
  action$.pipe(
    ofType(BrandActionTypes.Create),
    switchMap((action: CreateAction) => 
      ajax({
        ...createRequest,
        body: action.payload,
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(CreateSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(CreateFail(err))),
      )
    )
  );

const updateRequest: AjaxRequest = {
  url: BrandAPI.Base,
  method: AjaxRequestMethod.Put,
};

export const updateBransEpic = (action$: ActionsObservable<BrandActionsUnion>): Observable<BrandActionsUnion> =>
  action$.pipe(
    ofType(BrandActionTypes.Update),
    switchMap((action: UpdateAction) => 
      ajax({
        ...updateRequest,
        url: `${updateRequest.url}/${action.payload.id}`,
        body: { productBrandName: action.payload.productBrandName },
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(UpdateSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(UpdateFail(err))),
      )
    )
  );

const deleteRequest: AjaxRequest = {
  url: BrandAPI.Base,
  method: AjaxRequestMethod.Delete,
};

export const deleteBrandEpic = (action$: ActionsObservable<BrandActionsUnion>): Observable<BrandActionsUnion> =>
  action$.pipe(
    ofType(BrandActionTypes.Delete),
    mergeMap((action: DeleteAction) => 
      ajax({
        ...deleteRequest,
        url: `${updateRequest.url}/${action.payload}`,
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(DeleteSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(DeleteFail(err))),
      )
    )
  );

const sortRequest: AjaxRequest = {
  url: BrandAPI.Sort,
  method: AjaxRequestMethod.Put,
};

export const sortBrandEpic = (action$: ActionsObservable<BrandActionsUnion>): Observable<BrandActionsUnion> =>
  action$.pipe(
    ofType(BrandActionTypes.Sort),
    mergeMap((action: SortAction) => 
      ajax({
        ...sortRequest,
        body: action.payload,
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => {
          message.success('排序成功');
          return of(SortSuccess(), LoadAll())
        }),
        catchError((err: ErrorResponse) => of(SortFail(err))),
      )
    )
  );
