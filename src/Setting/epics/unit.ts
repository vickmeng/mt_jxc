import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { AjaxRequestMethod } from '@app/shared/constants';
import { UnitAPI } from '@app/shared/constants/api';
import { ErrorResponse } from '@app/shared/models';
import { ajax } from '@app/shared/utils';

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
  UnitActionsUnion,
  UnitActionTypes,
  UpdateAction,
  UpdateFail,
  UpdateSuccess,
} from '../actions/unit';
import { Unit } from '../models';

const loadAllRequest: AjaxRequest = {
  url: UnitAPI.LoadAll,
  method: AjaxRequestMethod.Get,
};

export const loadUnitsEpic = (action$: ActionsObservable<UnitActionsUnion>): Observable<UnitActionsUnion> =>
  action$.pipe(
    ofType(UnitActionTypes.LoadAll),
    switchMap(() =>
      ajax(loadAllRequest).pipe(
        map((response: AjaxResponse) => response.response),
        map((units: Unit[]) => LoadAllSuccess(units)),
        catchError((err: ErrorResponse) => of(LoadAllFail(err))),
      )
    )
  );

const createRequest: AjaxRequest = {
  url: UnitAPI.Base,
  method: AjaxRequestMethod.Post,
};

export const createUnitEpic = (action$: ActionsObservable<UnitActionsUnion>): Observable<UnitActionsUnion> =>
  action$.pipe(
    ofType(UnitActionTypes.Create),
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
  url: UnitAPI.Base,
  method: AjaxRequestMethod.Put,
};

export const updateUnitEpic = (action$: ActionsObservable<UnitActionsUnion>): Observable<UnitActionsUnion> =>
  action$.pipe(
    ofType(UnitActionTypes.Update),
    mergeMap((action: UpdateAction) => 
      ajax({
        ...updateRequest,
        url: `${updateRequest.url}/${action.payload.id}`,
        body: { productUnitName: action.payload.productUnitName },
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(UpdateSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(UpdateFail(err))),
      )
    )
  );

const deleteRequest: AjaxRequest = {
  url: UnitAPI.Base,
  method: AjaxRequestMethod.Delete,
};

export const deleteUnitEpic = (action$: ActionsObservable<UnitActionsUnion>): Observable<UnitActionsUnion> =>
  action$.pipe(
    ofType(UnitActionTypes.Delete),
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
