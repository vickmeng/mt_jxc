import { ActionsObservable, ofType, StateObservable} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import {catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { State } from '@app/root';
import { AjaxRequestMethod } from '@app/shared/constants';
import { WarehouseAPI } from '@app/shared/constants/api';
import { ErrorResponse, TableData } from '@app/shared/models';
import { ajax } from '@app/shared/utils';

import * as fromSetting from '../reducers';

import {
  CreateAction,
  CreateFail,
  CreateSuccess,
  DeleteAction,
  DeleteFail,
  DeleteSuccess,
  LoadAll,
  LoadAllFail,
  LoadAllSuccess,
  SetDefaultAction,
  SetDefaultFail,
  SetDefaultSuccess,
  SetStatusAction,
  SetStatusFail,
  SetStatusSuccess,
  UpdateAction,
  UpdateFail,
  UpdateSuccess,
  WarehouseActionsUnion,
  WarehouseActionTypes,
} from '../actions/warehouse';
import { Warehouse } from '../models';

const loadAllRequest: AjaxRequest = {
  url: WarehouseAPI.Base,
  method: AjaxRequestMethod.Get,
};

export const loadWarehousesEpic = (action$: ActionsObservable<WarehouseActionsUnion>, state$: StateObservable<State>): Observable<WarehouseActionsUnion> =>
  action$.pipe(
    ofType(WarehouseActionTypes.LoadAll, WarehouseActionTypes.ChangeTable),
    switchMap(() => {
      const pagination = fromSetting.getWarehousePagination(state$.value);
      return ajax({
        ...loadAllRequest,
        body: { pageNo: pagination.current, pageSize: pagination.pageSize },
      }).pipe(
        map((response: AjaxResponse) => response.response),
        map((tableData: TableData<Warehouse>) => LoadAllSuccess(tableData)),
        catchError((err: ErrorResponse) => of(LoadAllFail(err))),
      )
    })
  );

const createRequest: AjaxRequest = {
  url: WarehouseAPI.Base,
  method: AjaxRequestMethod.Post,
};

export const createWarehouseEpic = (action$: ActionsObservable<WarehouseActionsUnion>): Observable<WarehouseActionsUnion> =>
  action$.pipe(
    ofType(WarehouseActionTypes.Create),
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
  url: WarehouseAPI.Base,
  method: AjaxRequestMethod.Put,
};

export const updateWarehouseEpic = (action$: ActionsObservable<WarehouseActionsUnion>): Observable<WarehouseActionsUnion> =>
  action$.pipe(
    ofType(WarehouseActionTypes.Update),
    mergeMap((action: UpdateAction) => 
      ajax({
        ...updateRequest,
        body: action.payload,
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(UpdateSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(UpdateFail(err))),
      )
    )
  );

const deleteRequest: AjaxRequest = {
  url: WarehouseAPI.Base,
  method: AjaxRequestMethod.Put,
};

export const deleteWarehouseEpic = (action$: ActionsObservable<WarehouseActionsUnion>): Observable<WarehouseActionsUnion> =>
  action$.pipe(
    ofType(WarehouseActionTypes.Delete),
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

const setDefaultRequest: AjaxRequest = {
  url: WarehouseAPI.SetDefault,
  method: AjaxRequestMethod.Put,
};

export const setDefaultWarehouseEpic = (action$: ActionsObservable<WarehouseActionsUnion>): Observable<WarehouseActionsUnion> =>
  action$.pipe(
    ofType(WarehouseActionTypes.SetDefault),
    mergeMap((action: SetDefaultAction) => 
      ajax({
        ...setDefaultRequest,
        body: { currentWarehouseId: action.payload },
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(SetDefaultSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(SetDefaultFail(err))),
      )
    )
  );

const setStatusRequest: AjaxRequest = {
  url: WarehouseAPI.SetStatus,
  method: AjaxRequestMethod.Put,
};

export const setWarehouseStatusEpic = (action$: ActionsObservable<WarehouseActionsUnion>): Observable<WarehouseActionsUnion> =>
  action$.pipe(
    ofType(WarehouseActionTypes.SetStatus),
    mergeMap((action: SetStatusAction) => 
      ajax({
        ...setStatusRequest,
        body: action.payload,
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(SetStatusSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(SetStatusFail(err))),
      )
    )
  );