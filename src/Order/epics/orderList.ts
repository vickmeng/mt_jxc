import { ActionsObservable, ofType, StateObservable } from 'redux-observable';

import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';

import { State } from '@app/root';

import{message} from 'antd';

import { AjaxRequestMethod } from '@app/shared/constants';
import { OrderAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';
import * as utils from 'shared/utils';
import * as fromOrder from '../reducers';

import {
  LoadAll,
  LoadAllAction,
  LoadAllFail,
  LoadAllSuccess,
  OrderListActionsUnion,
  OrderListActionTypes,
  OrderSKAction,
  OrderSKFail
} from '../actions/OrderList';

const OrderSKRequest: AjaxRequest = {
  url: OrderAPI.OrderSK,
  method: AjaxRequestMethod.Post,
};

const loadAllRequest: AjaxRequest = {
  url: OrderAPI.LoadAll,
  method: AjaxRequestMethod.Get,
};

export const OrderSKEpic = (action$: ActionsObservable<OrderListActionsUnion>,state$:StateObservable<State>): Observable<OrderListActionsUnion> =>
  action$.pipe(
    ofType(OrderListActionTypes.OrderSK),
    mergeMap((action: OrderSKAction) => 
      ajax({
          ...OrderSKRequest,
          body:action.payload.body
        }).pipe(
        map(() => {
          message.success('收款成功');
          if(action.payload.callBack){action.payload.callBack();}

          const params = {
            ...utils.formatTimeRange(fromOrder.getOrderListTimeRangeState(state$.value)),
            ...utils.getPaginationParams(fromOrder.getOrderListTableData(state$.value)),
            ...fromOrder.getOrderListQueryParams(state$.value),
          };
          return  LoadAll(params)
        }),
        catchError((err: AjaxError) => of(OrderSKFail(err.response))),
      )
    )
  );


export const loadTableDataEpic = (action$: ActionsObservable<OrderListActionsUnion>): Observable<OrderListActionsUnion> =>
  action$.pipe(
    ofType(OrderListActionTypes.LoadAll),
    mergeMap((action: LoadAllAction) => 
      ajax({
          ...loadAllRequest,
          body:action.payload
        }).pipe(
        map(response => response.response),
        map((Columns) => LoadAllSuccess(Columns)),
        catchError((err: AjaxError) => of(LoadAllFail(err.response))),
      )
    )
  );