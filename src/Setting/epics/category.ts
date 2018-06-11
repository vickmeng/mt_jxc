import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { message } from 'antd';

import { AjaxRequestMethod } from '@app/shared/constants';
import { CategoryAPI } from '@app/shared/constants/api';
import { ErrorResponse } from '@app/shared/models';
import { ajax } from '@app/shared/utils';

import {
  BatchDeleteAction,
  BatchDeleteFail,
  BatchDeleteSuccess,
  CategoryActionsUnion,
  CategoryActionTypes,
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
} from '../actions/category';
import { Category } from '../models';

const loadAllRequest: AjaxRequest = {
  url: CategoryAPI.LoadAll,
  method: AjaxRequestMethod.Get,
};

export const loadCategoriesEpic = (action$: ActionsObservable<CategoryActionsUnion>): Observable<CategoryActionsUnion> =>
  action$.pipe(
    ofType(CategoryActionTypes.LoadAll),
    mergeMap(() => 
      ajax(loadAllRequest).pipe(
        map((response: AjaxResponse) => response.response),
        map((categories: Category[]) => LoadAllSuccess(categories)),
        catchError((err: ErrorResponse) => of(LoadAllFail(err))),
      )
    )
  );

const createRequest: AjaxRequest = {
  url: CategoryAPI.Base,
  method: AjaxRequestMethod.Post,
};

export const createCategoryEpic = (action$: ActionsObservable<CategoryActionsUnion>): Observable<CategoryActionsUnion> =>
  action$.pipe(
    ofType(CategoryActionTypes.Create),
    mergeMap((action: CreateAction) => 
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
  url: CategoryAPI.Base,
  method: AjaxRequestMethod.Put,
};

export const updateCategoryEpic = (action$: ActionsObservable<CategoryActionsUnion>): Observable<CategoryActionsUnion> =>
  action$.pipe(
    ofType(CategoryActionTypes.Update),
    mergeMap((action: UpdateAction) => 
      ajax({
        ...updateRequest,
        url: `${updateRequest.url}/${action.payload.id}`,
        body: { productCategoryName: action.payload.productCategoryName },
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(UpdateSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(UpdateFail(err))),
      )
    )
  );

const deleteRequest: AjaxRequest = {
  url: CategoryAPI.Base,
  method: AjaxRequestMethod.Delete,
};

export const deleteCategoryEpic = (action$: ActionsObservable<CategoryActionsUnion>): Observable<CategoryActionsUnion> =>
  action$.pipe(
    ofType(CategoryActionTypes.Delete),
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

const batchDeleteRequest: AjaxRequest = {
  url: CategoryAPI.Base,
  method: AjaxRequestMethod.Delete,
};

export const batchDeleteCategoryEpic = (action$: ActionsObservable<CategoryActionsUnion>): Observable<CategoryActionsUnion> =>
  action$.pipe(
    ofType(CategoryActionTypes.BatchDelete),
    mergeMap((action: BatchDeleteAction) => 
      ajax({
        ...batchDeleteRequest,
        body: { categoryIds: action.payload },
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(BatchDeleteSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(BatchDeleteFail(err))),
      )
    )
  );

const sortRequest: AjaxRequest = {
  url: CategoryAPI.Sort,
  method: AjaxRequestMethod.Put,
};

export const sortCategoryEpic = (action$: ActionsObservable<CategoryActionsUnion>): Observable<CategoryActionsUnion> =>
  action$.pipe(
    ofType(CategoryActionTypes.Sort),
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