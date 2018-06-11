import {
  InOutListActionsUnion,
  InOutListActionTypes,
} from '../../actions/inOutList';

import { initTableStateConfig} from '@app/shared/constants'
import {  TableState } from '@app/shared/models'

export interface State extends TableState{
}

const initialState: State = {
  ...initTableStateConfig,
};

export const reducer = (
  state: State = initialState,
  action: InOutListActionsUnion,
): State => {
  switch (action.type) {

    case InOutListActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
      };
    
    case InOutListActionTypes.LoadAllSuccess:
    
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: action.payload.list,
        total: action.payload.totalCount,
        pageSize:action.payload.pageSize,
        pageNo:action.payload.pageNo
      };

    case InOutListActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
      };

    case InOutListActionTypes.SetQueryParams:
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

export const getQueryParams = (state: State): boolean => state.queryParams;
