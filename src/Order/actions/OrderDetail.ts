import { Action } from 'redux';


import {
  OrderRemark,
} from '../models'

export enum OrderDetailActionTypes {
  LoadOrderDetail = '[OrderDetail] Load Order Detail',
  LoadOrderDetailSuccess = '[OrderDetail] Load Order Detail Success',
  LoadOrderDetailFail = '[OrderDetail] Load Order Detail Fail',

  LoadOrderRemark = '[OrderDetail] Load Order Remark',
  LoadOrderRemarkSuccess = '[OrderDetail] Load Order Remark Success',
  LoadOrderRemarkFail = '[OrderDetail] Load Order Remark Fail',

  ChangeOrderProduct = '[OrderDetail] Change Order Product Remark',
  ChangeOrderProductSuccess = '[OrderDetail] Change Order Product Remark Success',
  ChangeOrderProductFail = '[OrderDetail] Change Order Product Remark Fail',

  AddOrderRemark = '[OrderDetail] Add Order Remark',
  AddOrderRemarkSuccess = '[OrderDetail] Add Order Remark Success',
  AddOrderRemarkFail = '[OrderDetail] Add Order Remark Fail',

  ChangeOrderStatus = '[OrderDetail] Change Order Status',
  ChangeOrderStatusSuccess = '[OrderDetail] Change Order Status Success',
  ChangeOrderStatusFail = '[OrderDetail] Change Order Status Fail',

  DeleteOrder = '[OrderDetail] Delete Order',
  DeleteOrderSuccess = '[OrderDetail] Delete Order Success',
}

export interface DeleteOrderAction extends Action { 
  payload: any;
}

export interface DeleteOrderSuccessAction extends Action { 
}

export interface ChangeOrderStatusAction extends Action { 
  payload: any;
}

export interface ChangeOrderStatusSuccessAction extends Action { 
  payload: any;
}

export interface ChangeOrderStatusFailAction extends Action {
  payload: any;
}

export interface ChangeOrderProductAction extends Action { 
  payload: any;
}

export interface ChangeOrderProductSuccessAction extends Action { 
  payload: any;
}

export interface ChangeOrderProductFailAction extends Action {
  payload: any;
}


export interface LoadOrderDetailAction extends Action { 
  payload: any;
}

export interface LoadOrderDetailSuccessAction extends Action { 
  payload: any;
}

export interface LoadOrderDetailFailAction extends Action {
  payload: any;
}

export interface LoadOrderRemarkAction extends Action { 
  payload: any;
}

export interface LoadOrderRemarkSuccessAction extends Action { 
  payload: any;
}

export interface LoadOrderRemarkFailAction extends Action {
  payload: any;
}

export interface AddOrderRemarkAction extends Action { 
  payload: any;
}

export interface AddOrderRemarkSuccessAction extends Action { 
  payload: any;
}

export interface AddOrderRemarkFailAction extends Action {
  payload: any;
}


export const DeleteOrder = (payload:any): DeleteOrderAction => ({
  type: OrderDetailActionTypes.DeleteOrder,
  payload,
});

export const DeleteOrderSuccess = (): DeleteOrderSuccessAction => ({
  type: OrderDetailActionTypes.DeleteOrderSuccess,
});

export const ChangeOrderStatus = (payload:any): ChangeOrderStatusAction => ({
  type: OrderDetailActionTypes.ChangeOrderStatus,
  payload,
});

export const ChangeOrderStatusSuccess = (payload:any): ChangeOrderStatusSuccessAction => ({
  type: OrderDetailActionTypes.ChangeOrderStatusSuccess,
  payload,
});

export const ChangeOrderStatusFail = (payload:any): ChangeOrderStatusFailAction => ({
  type: OrderDetailActionTypes.ChangeOrderStatusFail,
  payload,
});



export const ChangeOrderProduct = (payload:any): ChangeOrderProductAction => ({
  type: OrderDetailActionTypes.ChangeOrderProduct,
  payload,
});

export const ChangeOrderProductSuccess = (payload:any): ChangeOrderProductSuccessAction => ({
  type: OrderDetailActionTypes.ChangeOrderProductSuccess,
  payload,
});

export const ChangeOrderProductFail = (payload:any): ChangeOrderProductFailAction => ({
  type: OrderDetailActionTypes.ChangeOrderProductFail,
  payload,
});


export const LoadOrderDetail = (payload:string): LoadOrderDetailAction => ({
  type: OrderDetailActionTypes.LoadOrderDetail,
  payload,
});

export const LoadOrderDetailSuccess = (payload:any): LoadOrderDetailSuccessAction => ({
  type: OrderDetailActionTypes.LoadOrderDetailSuccess,
  payload,
});

export const LoadOrderDetailFail = (payload:any): LoadOrderDetailFailAction => ({
  type: OrderDetailActionTypes.LoadOrderDetailFail,
  payload,
});

export const LoadOrderRemark = (payload:string): LoadOrderRemarkAction => ({
  type: OrderDetailActionTypes.LoadOrderRemark,
  payload,
});

export const LoadOrderRemarkSuccess = (payload:OrderRemark[]): LoadOrderRemarkSuccessAction => ({
  type: OrderDetailActionTypes.LoadOrderRemarkSuccess,
  payload,
});

export const LoadOrderRemarkFail = (payload:any): LoadOrderRemarkAction => ({
  type: OrderDetailActionTypes.LoadOrderRemarkFail,
  payload,
});

export const AddOrderRemark = (payload:any): AddOrderRemarkAction => ({
  type: OrderDetailActionTypes.AddOrderRemark,
  payload,
});

export const AddOrderRemarkSuccess = (payload:OrderRemark[]): AddOrderRemarkSuccessAction => ({
  type: OrderDetailActionTypes.AddOrderRemarkSuccess,
  payload,
});

export const AddOrderRemarkFail = (payload:any): AddOrderRemarkAction => ({
  type: OrderDetailActionTypes.AddOrderRemarkFail,
  payload,
});



export type OrderDetailActionsUnion =
  | ChangeOrderStatusAction
  | ChangeOrderStatusSuccessAction
  | ChangeOrderStatusFailAction
  | ChangeOrderProductAction
  | ChangeOrderProductSuccessAction
  | ChangeOrderProductFailAction
  | LoadOrderDetailAction
  | LoadOrderDetailSuccessAction
  | LoadOrderDetailFailAction
  | LoadOrderRemarkAction
  | LoadOrderRemarkSuccessAction
  | LoadOrderRemarkFailAction
  | AddOrderRemarkAction
  | AddOrderRemarkSuccessAction
  | AddOrderRemarkFailAction
  | DeleteOrderAction
  | DeleteOrderSuccessAction
;