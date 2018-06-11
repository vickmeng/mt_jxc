import {
  BrandActionsUnion,
  BrandActionTypes,
  LoadAllSuccessAction,
} from '../../actions/brand';
import { Brand } from '../../models';

export interface State {
  loaded: boolean;
  loading: boolean;
  entities: Brand[];
  selectedRowKeys: number[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  entities: [],
  selectedRowKeys: [],
};

export const reducer = (
  state: State = initialState,
  action: BrandActionsUnion
): State => {
  switch (action.type) {

    case BrandActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
        selectedRowKeys: [],
      };
    
    case BrandActionTypes.LoadAllSuccess:
      return {
        loaded: true,
        loading: false,
        entities: (action as LoadAllSuccessAction).payload,
        selectedRowKeys: [],
      };
    
    case BrandActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
        selectedRowKeys: [],
      };
    
    case BrandActionTypes.Delete:
      return {
        ...state,
        loading: true,
      };
    
    case BrandActionTypes.DeleteSuccess:
    case BrandActionTypes.DeleteFail:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export const getLoaded = (state: State): boolean => state.loaded;

export const getLoading = (state: State): boolean => state.loading;

export const getBrands = (state: State): Brand[] => state.entities;

export const getSelectedRowKeys = (state: State): number[] => state.selectedRowKeys;