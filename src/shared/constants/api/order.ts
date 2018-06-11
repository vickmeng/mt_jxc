export const enum OrderAPI {
  LoadAll = '/v1/order/orders',
  OrderDetail = '/v1/order',
  Remarks = '/v1/order',// order/:id/remark/remarks
  AddRemark ='/v1/order',
  ChangeProductremark='/v1/order', // order/:orderId/product/:productId/remark
  ChangeOrderStatus = '/v1/order', // order/:orderId/status
  DeletedOrder = '/v1/order', // /order/:orderId
  OrderSK = '/v1/finance'
}
