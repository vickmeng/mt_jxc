import {
  InventoryActionsUnion,
  InventoryActionTypes,
} from '../../actions/inventory';

import { initTableStateConfig} from '@app/shared/constants'
import {  TableState } from '@app/shared/models'

export interface State extends TableState{
  
}

const initialState: State = initTableStateConfig;

export const reducer = (
  state: State = initialState,
  action: InventoryActionsUnion,
): State => {
  switch (action.type) {

    case InventoryActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
      };
    
    case InventoryActionTypes.LoadAllSuccess:
    
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: action.payload.list,
        total: action.payload.totalCount,
        pageSize:action.payload.pageSize,
        pageNo:action.payload.pageNo
      };

    case InventoryActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
      };

    case InventoryActionTypes.SetQueryParams:
      return {
        ...state,
        queryParams:action.payload
      };

    default:
      return state;
  }
};

export const getInventories = (state: State): any => state;

export const getLoaded = (state: State): boolean => state.loaded;

export const getLoading = (state: State): boolean => state.loading;

export const getQueryParams = (state: State): boolean => state.queryParams;
