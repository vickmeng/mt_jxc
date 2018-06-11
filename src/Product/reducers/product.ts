import { defaultPagination } from '@app/shared/constants';
import { ColumnData, Pagination } from '@app/shared/models';
import { transformPagination } from '@app/shared/utils';
import {
  ChangeSelectedRowKeysAction,
  ChangeTableAction,
  ChangeTableColumnAction,
  LoadAllSuccessAction,
  ProductActionsUnion,
  ProductActionTypes,
} from '../actions/product';
import { productColumns } from '../constants';
import { Product } from '../models';

export interface State {
  loaded: boolean;
  loading: boolean;
  entities: Product[];
  pagination: Pagination;
  selectedRowKeys: number[];
  columns: Array<ColumnData<Product>>;
}

const initialState: State = {
  loaded: false,
  loading: false,
  entities: [],
  pagination: defaultPagination,
  selectedRowKeys: [],
  columns: productColumns,
};

export const reducer = (
  state: State = initialState,
  action: ProductActionsUnion,
): State => {
  switch (action.type) {

    case ProductActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
      };

    case ProductActionTypes.LoadAllSuccess:
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: (action as LoadAllSuccessAction).payload.list,
        pagination: transformPagination((action as LoadAllSuccessAction).payload),
      };

    case ProductActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
      };

    case ProductActionTypes.ChangeTable:
      return {
        ...state,
        loading: true,
        pagination: (action as ChangeTableAction).payload.pagination as Pagination,
      };

    case ProductActionTypes.ChangeSelectedRowKeys:
      return {
        ...state,
        selectedRowKeys: (action as ChangeSelectedRowKeysAction).payload,
      };

    case ProductActionTypes.ChangeTableColumn:
      return {
        ...state,
        columns: (action as ChangeTableColumnAction).payload,
      };

    case ProductActionTypes.BatchSetStatus:
    case ProductActionTypes.BatchDelete:
      return {
        ...state,
        loading: true,
      };

    case ProductActionTypes.BatchSetStatusSuccess:
    case ProductActionTypes.BatchSetStatusFail:
    case ProductActionTypes.BatchDeleteSuccess:
    case ProductActionTypes.BatchDeleteFail:
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

export const getProducts = (state: State): Product[] => state.entities;

export const getPagination = (state: State): Pagination => state.pagination;

export const getSelectedRowKeys = (state: State): number[] => state.selectedRowKeys;

export const getColumns = (state: State): Array<ColumnData<Product>> => state.columns;
