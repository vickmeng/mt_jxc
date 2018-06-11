import { go } from 'react-router-redux'

import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';

import { message } from 'antd';

import { AjaxRequestMethod } from '@app/shared/constants';
import { WarehouseAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';
import { store } from 'index'

import {
  StockCancelAction,
  StockCancelActionsUnion,
  StockCancelActionTypes,
  StockCancelFail,
  StockCancelSuccess
} from '../actions/stockCancelModal';


const stockCancelRequest: AjaxRequest = {
  url: WarehouseAPI.stockCancel,
  method: AjaxRequestMethod.Put,
};

export const StockCancelEpic = (action$: ActionsObservable<StockCancelActionsUnion>): Observable<StockCancelActionsUnion> =>
  action$.pipe(
    ofType(StockCancelActionTypes.StockCancel),
    mergeMap((action: StockCancelAction) => 
      ajax({
          ...stockCancelRequest,
          body: action.payload,
        }).pipe(
        map(response => response.response),
        map(() => {
          message.success('作废成功');
          store.dispatch(go(-1));
          return StockCancelSuccess()
        }),
        catchError((err: AjaxError) => of(StockCancelFail(err.response))),
      )
    )
  );