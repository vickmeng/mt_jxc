import {
  AddOrderRemarkSuccessAction,
  LoadOrderDetailSuccessAction,
  OrderDetailActionsUnion,
  OrderDetailActionTypes,
} from '../../actions/OrderDetail';

export interface State {
  loading:boolean;
  detailData:any[];
  remarks:any[];
}

const initialState: State = {
  loading:false,
  detailData:[],
  remarks:[]
};

export const reducer = (
  state: State = initialState,
  action: OrderDetailActionsUnion,
): State => {
  switch (action.type) {
    case OrderDetailActionTypes.DeleteOrder:
      return {
        ...state,
      }
    case OrderDetailActionTypes.ChangeOrderStatus:
      return {
        ...state,
      }
    case OrderDetailActionTypes.ChangeOrderStatusSuccess:
      return {
        ...state,
      }
    case OrderDetailActionTypes.ChangeOrderStatusFail:
      return {
        ...state,
      }
    
    case OrderDetailActionTypes.ChangeOrderProduct:
      return {
        ...state,
        loading:true
      }
    case OrderDetailActionTypes.ChangeOrderProductSuccess:
      return {
        ...state,
        loading:false
      }
    case OrderDetailActionTypes.ChangeOrderProductFail:
      return {
        ...state,
        loading:false
      }
    
    case OrderDetailActionTypes.LoadOrderDetail:
      return {
        ...state,
        loading:true
      }

    case OrderDetailActionTypes.LoadOrderDetailSuccess:
      return {
        ...state,
        loading:false,
        detailData:(action as LoadOrderDetailSuccessAction).payload
      }

    case OrderDetailActionTypes.LoadOrderDetailFail:
      return {
        ...state,
        loading:false
      }

    case OrderDetailActionTypes.LoadOrderRemark:
      return {
        ...state,
        loading:true
      }

    case OrderDetailActionTypes.LoadOrderRemarkSuccess:
      return {
        ...state,
        loading:false,
        remarks:(action as AddOrderRemarkSuccessAction).payload
      }
    case OrderDetailActionTypes.LoadOrderRemarkFail:
      return {
        ...state,
        loading:false
      }
    case OrderDetailActionTypes.AddOrderRemark:
      return {
        ...state,
      }

    case OrderDetailActionTypes.AddOrderRemarkSuccess:
      return {
        ...state,
      }
    case OrderDetailActionTypes.AddOrderRemarkFail:
      return {
        ...state,
      }
    default:
      return state;
  }
};

export const getOrderDetail = (state: State): any => state;

export const getLoading = (state: State): boolean => state.loading;

export const getDetailData = (state: State): any => state.detailData;

export const getRemarks = (state: State): any => state.remarks;