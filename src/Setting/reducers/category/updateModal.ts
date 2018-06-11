import {
  CategoryActionsUnion,
  CategoryActionTypes,
  OpenUpdateModalAction,
} from '../../actions/category';
import { Category } from '../../models';

export interface State {
  visible: boolean;
  confirmLoading: boolean;
  editedEntity: Category | null;
}

const initialState: State = {
  visible: false,
  confirmLoading: false,
  editedEntity: null,
};

export const reducer = (
  state: State = initialState,
  action: CategoryActionsUnion,
): State => {
  switch(action.type) {

    case CategoryActionTypes.OpenUpdateModal:
      return {
        visible: true,
        confirmLoading: false,
        editedEntity: (action as OpenUpdateModalAction).payload,
      };
    
    case CategoryActionTypes.CloseUpdateModal:
      return initialState;
    
    case CategoryActionTypes.Update:
      return {
        ...state,
        confirmLoading: true,
      };
    
    case CategoryActionTypes.UpdateSuccess:
      return initialState;
    
    case CategoryActionTypes.UpdateFail:
      return {
        ...state,
        confirmLoading: false,
      };

    default:
      return state;
  }
};

export const getVisible = (state: State): boolean => state.visible;

export const getConfirmLoading = (state: State): boolean => state.confirmLoading;

export const getEditedEntity = (state: State): Category | null => state.editedEntity;
