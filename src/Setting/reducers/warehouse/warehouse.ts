import { defaultPagination } from '@app/shared/constants';
import { Pagination } from '@app/shared/models';
import { transformPagination } from '@app/shared/utils';
import {
  ChangeTableAction,
  LoadAllSuccessAction,
  WarehouseActionsUnion,
  WarehouseActionTypes,
} from '../../actions/warehouse';
import { Warehouse } from '../../models';

export interface State {
  loaded: boolean;
  loading: boolean;
  entities: Warehouse[];
  pagination: Pagination;
}

const initialState: State = {
  loaded: false,
  loading: false,
  entities: [],
  pagination: defaultPagination,
};

export const reducer = (
  state: State = initialState,
  action: WarehouseActionsUnion,
): State => {
  switch (action.type) {

    case WarehouseActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
      };
    
    case WarehouseActionTypes.LoadAllSuccess:
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: (action as LoadAllSuccessAction).payload.list,
        pagination: transformPagination((action as LoadAllSuccessAction).payload),
      };
    
    case WarehouseActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
      };
    
    case WarehouseActionTypes.ChangeTable:
      return {
        ...state,
        loading: true,
        pagination: (action as ChangeTableAction).payload.pagination as Pagination,
      };
    
    case WarehouseActionTypes.Delete:
    case WarehouseActionTypes.SetDefault:
    case WarehouseActionTypes.SetStatus:
      return {
        ...state,
        loading: true,
      };
    
    case WarehouseActionTypes.DeleteSuccess:
    case WarehouseActionTypes.DeleteFail:
    case WarehouseActionTypes.SetDefaultSuccess:
    case WarehouseActionTypes.SetDefaultFail:
    case WarehouseActionTypes.SetStatusSuccess:
    case WarehouseActionTypes.SetStatusFail:
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

export const getEntities = (state: State): Warehouse[] => state.entities;

export const getPagination = (state: State): Pagination => state.pagination;

