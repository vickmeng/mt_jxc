import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { message } from 'antd';

import { AjaxRequestMethod } from '@app/shared/constants';
import { DealerLevelAPI } from '@app/shared/constants/api';
import { ErrorResponse } from '@app/shared/models';
import { ajax } from '@app/shared/utils';

import {
  CreateAction,
  CreateFail,
  CreateSuccess,
  DealerLevelActionsUnion,
  DealerLevelActionTypes,
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
} from '../actions/dealerLevel';
import { DealerLevel } from '../models';

const loadAllRequest: AjaxRequest = {
  url: DealerLevelAPI.Base,
  method: AjaxRequestMethod.Get,
};

export const loadDealerLevelsEpic = (action$: ActionsObservable<DealerLevelActionsUnion>): Observable<DealerLevelActionsUnion> =>
  action$.pipe(
    ofType(DealerLevelActionTypes.LoadAll),
    switchMap(() =>
      ajax(loadAllRequest).pipe(
        map((response: AjaxResponse) => response.response),
        map((dealerLevels: DealerLevel[]) => LoadAllSuccess(dealerLevels)),
        catchError((err: ErrorResponse) => of(LoadAllFail(err))),
      )
    )
  );

const createRequest: AjaxRequest = {
  url: DealerLevelAPI.Base,
  method: AjaxRequestMethod.Post,
};

export const createDealerLevelEpic = (action$: ActionsObservable<DealerLevelActionsUnion>): Observable<DealerLevelActionsUnion> =>
  action$.pipe(
    ofType(DealerLevelActionTypes.Create),
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
  url: DealerLevelAPI.Base,
  method: AjaxRequestMethod.Put,
};

export const updateDealerLevelEpic = (action$: ActionsObservable<DealerLevelActionsUnion>): Observable<DealerLevelActionsUnion> =>
  action$.pipe(
    ofType(DealerLevelActionTypes.Update),
    mergeMap((action: UpdateAction) => 
      ajax({
        ...updateRequest,
        url: `${updateRequest.url}/${action.payload.tenantLevelId}`,
        body: action.payload,
      }).pipe(
        map((response: AjaxResponse) => response.response),
        mergeMap(() => of(UpdateSuccess(), LoadAll())),
        catchError((err: ErrorResponse) => of(UpdateFail(err))),
      )
    )
  );

const deleteRequest: AjaxRequest = {
  url: DealerLevelAPI.Base,
  method: AjaxRequestMethod.Delete,
};

export const deleteDealerLevelEpic = (action$: ActionsObservable<DealerLevelActionsUnion>): Observable<DealerLevelActionsUnion> =>
  action$.pipe(
    ofType(DealerLevelActionTypes.Delete),
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
  url: DealerLevelAPI.Sort,
  method: AjaxRequestMethod.Put,
};

export const sortDealerLevelEpic = (action$: ActionsObservable<DealerLevelActionsUnion>): Observable<DealerLevelActionsUnion> =>
  action$.pipe(
    ofType(DealerLevelActionTypes.Sort),
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
