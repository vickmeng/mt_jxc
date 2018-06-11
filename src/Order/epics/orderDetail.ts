import { push } from 'react-router-redux'

import { message } from "antd";
import { ActionsObservable, ofType ,StateObservable} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';

import { State } from '@app/root';

import { AjaxRequestMethod } from '@app/shared/constants';
import { OrderAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';
import * as utils from 'shared/utils';
import * as fromOrder from '../reducers';

import {
  AddOrderRemarkAction,
  
  ChangeOrderProductAction,
  ChangeOrderProductFail,
  // ChangeOrderProductSuccess,
  
  ChangeOrderStatusAction,
  ChangeOrderStatusFail,

  DeleteOrderAction,
  DeleteOrderSuccess,

  LoadOrderDetail,
  LoadOrderDetailAction,
  LoadOrderDetailFail,
  LoadOrderDetailSuccess,

  LoadOrderRemark,
  LoadOrderRemarkAction,
  LoadOrderRemarkFail,
  LoadOrderRemarkSuccess,

  OrderDetailActionsUnion,
  OrderDetailActionTypes,
} from '../actions/OrderDetail';

import {
  LoadAll
}from '../actions/OrderList'


import { store } from 'index'


const DeleteOrderRequest: AjaxRequest = {
  url: OrderAPI.DeletedOrder,
  method: AjaxRequestMethod.Delete,
};

const ChangeOrderStatusRequest: AjaxRequest = {
  url: OrderAPI.ChangeProductremark,
  method: AjaxRequestMethod.Put,
};

const AddOrderRemarkRequest: AjaxRequest = {
  url: OrderAPI.AddRemark,
  method: AjaxRequestMethod.Post,
};

const ChangeOrderProductRequest: AjaxRequest = {
  url: OrderAPI.ChangeProductremark,
  method: AjaxRequestMethod.Put,
};


const loadOrderDetailRequest: AjaxRequest = {
  url: OrderAPI.OrderDetail,
  method: AjaxRequestMethod.Get,
};

const loadOrderRemarkRequest: AjaxRequest = {
  url: OrderAPI.Remarks,
  method: AjaxRequestMethod.Get,
};

export const DeleteOrderEpic = (action$: ActionsObservable<OrderDetailActionsUnion>,state$:StateObservable<State>): Observable<OrderDetailActionsUnion> =>
  action$.pipe(
    ofType(OrderDetailActionTypes.DeleteOrder),
    mergeMap((action: DeleteOrderAction) => 
      ajax({
          ...DeleteOrderRequest,
          url: `${DeleteOrderRequest.url}/${action.payload.orderId}`,
        }).pipe(
        mergeMap(() => {
          message.success('删除成功');
          if(action.payload.callBack){action.payload.callBack();}
          
          if((state$ as any).value.router.location.pathname === '/order/orderList'){
            const params = {
              ...utils.formatTimeRange(fromOrder.getOrderListTimeRangeState(state$.value)),
              ...utils.getPaginationParams(fromOrder.getOrderListTableData(state$.value)),
              ...fromOrder.getOrderListQueryParams(state$.value),
            };
            return of(DeleteOrderSuccess(), LoadAll(params))
          }else {
            store.dispatch(push('/order/orderList'));
            return of(DeleteOrderSuccess())
          }
        }),
        catchError((err: AjaxError) => of(ChangeOrderStatusFail(err.response))),
      )
    )
  );

export const ChangeOrderStatusEpic = (action$: ActionsObservable<OrderDetailActionsUnion>): Observable<OrderDetailActionsUnion> =>
  action$.pipe(
    ofType(OrderDetailActionTypes.ChangeOrderStatus),
    mergeMap((action: ChangeOrderStatusAction) => 
      ajax({
          ...ChangeOrderStatusRequest,
          url: `${ChangeOrderStatusRequest.url}/${action.payload.orderId}/status`,
          body:action.payload.body
        }).pipe(
        map(() => {
          message.success('修改成功');
          if(action.payload.callBack){action.payload.callBack();}
          return LoadOrderDetail(action.payload.orderId)
        }),
        catchError((err: AjaxError) => of(ChangeOrderStatusFail(err.response))),
      )
    )
  );

export const AddOrderRemarkEpic = (action$: ActionsObservable<OrderDetailActionsUnion>): Observable<OrderDetailActionsUnion> =>
  action$.pipe(
    ofType(OrderDetailActionTypes.AddOrderRemark),
    mergeMap((action: AddOrderRemarkAction) => 
      ajax({
          ...AddOrderRemarkRequest,
          url: `${AddOrderRemarkRequest.url}/${action.payload.orderId}/remark`,
          body:action.payload.body
        }).pipe(
        map(() => {
          message.success('修改成功');
          action.payload.callBack();
          return LoadOrderRemark(action.payload.orderId)
        }),
        catchError((err: AjaxError) => of(ChangeOrderProductFail(err.response))),
      )
    )
  );



export const ChangeOrderProductEpic = (action$: ActionsObservable<OrderDetailActionsUnion>): Observable<OrderDetailActionsUnion> =>
  action$.pipe(
    ofType(OrderDetailActionTypes.ChangeOrderProduct),
    mergeMap((action: ChangeOrderProductAction) => 
      ajax({
          ...ChangeOrderProductRequest,
          url:`${ChangeOrderProductRequest.url}/${action.payload.orderId}/product/${action.payload.productId}/remark`,
          body:{remark:action.payload.remark}
        }).pipe(
        map(() => {
          message.success('修改成功');
          return LoadOrderDetail(action.payload.orderId)
        }),
        catchError((err: AjaxError) => of(ChangeOrderProductFail(err.response))),
      )
    )
  );


export const LoadOrderDetailEpic = (action$: ActionsObservable<OrderDetailActionsUnion>): Observable<OrderDetailActionsUnion> =>
  action$.pipe(
    ofType(OrderDetailActionTypes.LoadOrderDetail),
    mergeMap((action: LoadOrderDetailAction) => 
      ajax({
          ...loadOrderDetailRequest,
          url:loadOrderDetailRequest.url+'/'+action.payload
        }).pipe(
        map(response => response.response),
        map((res) => LoadOrderDetailSuccess(res)),
        catchError((err: AjaxError) => of(LoadOrderDetailFail(err.response))),
      )
    )
  );

export const LoadOrderRemarkEpic = (action$: ActionsObservable<OrderDetailActionsUnion>): Observable<OrderDetailActionsUnion> =>
  action$.pipe(
    ofType(OrderDetailActionTypes.LoadOrderRemark),
    mergeMap((action: LoadOrderRemarkAction) => 
      ajax({
          ...loadOrderRemarkRequest,
          url:loadOrderDetailRequest.url+'/'+action.payload + '/remark/remarks'
        }).pipe(
        map(response => response.response),
        map((res) => LoadOrderRemarkSuccess(res)),
        catchError((err: AjaxError) => of(LoadOrderRemarkFail(err.response))),
      )
    )
  );