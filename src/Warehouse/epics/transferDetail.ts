import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';

import { AjaxRequestMethod } from '@app/shared/constants';
import { WarehouseAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';
import {
  SetTransferDetailAction,
  SetTransferDetailFail,
  SetTransferDetailSuccess,

  SetTransferOperatelogAction,
  SetTransferOperatelogFail,
  SetTransferOperatelogSuccess,

  TransferDetailActionsUnion,
  TransferDetailActionTypes,
} from '../actions/transferDetail';


const setTransferDetailRequest: AjaxRequest = {
  url: WarehouseAPI.TransferDetail,
  method: AjaxRequestMethod.Get,
};

const setTransferOperatelogRequest: AjaxRequest = {
  url: WarehouseAPI.TransferLog,
  method: AjaxRequestMethod.Get,
};

export const SetTransferDetailEpic = (action$: ActionsObservable<TransferDetailActionsUnion>): Observable<TransferDetailActionsUnion> =>
  action$.pipe(
    ofType(TransferDetailActionTypes.SetTransferDetail),
    mergeMap((action: SetTransferDetailAction) => 
      ajax({
          ...setTransferDetailRequest,
          url:setTransferDetailRequest.url+'/'+action.payload.transferStockId
        }).pipe(
        map(response => response.response),
        map((res) => SetTransferDetailSuccess(res)),
        catchError((err: AjaxError) => of(SetTransferDetailFail(err.response))),
      )
    )
  );

export const SetTransferOperatelogEpic = (action$: ActionsObservable<TransferDetailActionsUnion>): Observable<TransferDetailActionsUnion> =>
  action$.pipe(
    ofType(TransferDetailActionTypes.SetTransferOperatelog),
    mergeMap((action: SetTransferOperatelogAction) => 
      ajax({
          ...setTransferOperatelogRequest,
          url:setTransferOperatelogRequest.url+'/'+action.payload.transferStockId
        }).pipe(
        map(response => response.response),
        map((res) => SetTransferOperatelogSuccess(res)),
        catchError((err: AjaxError) => of(SetTransferOperatelogFail(err.response))),
      )
    )
  );