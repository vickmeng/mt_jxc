import {
  CategoryActionsUnion,
  CategoryActionTypes,
  ChangeSelectedRowKeysAction,
  LoadAllSuccessAction,
} from '../../actions/category';
import { Category } from '../../models';

export interface State {
  loaded: boolean;
  loading: boolean;
  entities: Category[];
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
  action: CategoryActionsUnion,
): State => {
  switch (action.type) {

    case CategoryActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
        selectedRowKeys: [],
      };
    
    case CategoryActionTypes.LoadAllSuccess:
      return {
        loaded: true,
        loading: false,
        entities: (action as LoadAllSuccessAction).payload,
        selectedRowKeys: [],
      };
    
    case CategoryActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
        selectedRowKeys: [],
      };
    
    case CategoryActionTypes.ChangeSelectedRowKeys:
      return {
        ...state,
        selectedRowKeys: (action as ChangeSelectedRowKeysAction).payload,
      }
    
    case CategoryActionTypes.Delete:
    case CategoryActionTypes.BatchDelete:
      return {
        ...state,
        loading: true,
      };
    
    case CategoryActionTypes.DeleteSuccess:
    case CategoryActionTypes.DeleteFail:
    case CategoryActionTypes.BatchDeleteSuccess:
    case CategoryActionTypes.BatchDeleteFail:
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

export const getCategories = (state: State): Category[] => state.entities;

export const getSelectedRowKeys = (state: State): number[] => state.selectedRowKeys;
