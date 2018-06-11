import {
  OrderListActionsUnion,
  OrderListActionTypes,
} from '../../actions/OrderList';

import { initTableStateConfig} from '@app/shared/constants'
import {  TableState } from '@app/shared/models'

export interface State extends TableState{
}

const initialState: State = {
  ...initTableStateConfig,
};

export const reducer = (
  state: State = initialState,
  action: OrderListActionsUnion,
): State => {
  switch (action.type) {
    case OrderListActionTypes.OrderSK:
      return {
        ...state,
      };
    case OrderListActionTypes.OrderSKSuccess:
      return {
        ...state,
      };
    case OrderListActionTypes.OrderSKFail:
      return {
        ...state,
      };
    
    case OrderListActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
      };
    
    case OrderListActionTypes.LoadAllSuccess:
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: action.payload.list,
        total: action.payload.totalCount,
        pageSize:action.payload.pageSize,
        pageNo:action.payload.pageNo
      };

    case OrderListActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
      };

    case OrderListActionTypes.SetQueryParams:
      return {
        ...state,
        queryParams:action.payload
      };

    default:
      return state;
  }
};

export const getTableData = (state: State): any => state;

export const getLoaded = (state: State): boolean => state.loaded;

export const getLoading = (state: State): boolean => state.loading;

export const getQueryParams = (state: State): any => state.queryParams;
