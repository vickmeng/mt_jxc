import {
  loadTableDataEpic as loadTableDataEpicOrderList,
  OrderSKEpic,
} from './orderList'


import {
  AddOrderRemarkEpic as AddOrderRemarkEpicOrderDetail,
  ChangeOrderProductEpic as ChangeOrderProductEpicOrderDetail,
  ChangeOrderStatusEpic as ChangeOrderStatusEpicOrderDetail,
  DeleteOrderEpic,
  LoadOrderDetailEpic as  LoadOrderDetailEpicOrderDetail,
  LoadOrderRemarkEpic as LoadOrderRemarkEpicOrderDetail,
} from './orderDetail'

export const orderListEpics = [
  OrderSKEpic,
  loadTableDataEpicOrderList
];

export const orderDetailEpics = [
  DeleteOrderEpic,
  AddOrderRemarkEpicOrderDetail,
  ChangeOrderProductEpicOrderDetail,
  LoadOrderDetailEpicOrderDetail,
  LoadOrderRemarkEpicOrderDetail,
  ChangeOrderStatusEpicOrderDetail
];

