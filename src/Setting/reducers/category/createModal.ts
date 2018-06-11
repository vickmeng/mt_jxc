import { CategoryActionsUnion, CategoryActionTypes } from '../../actions/category';

export interface State {
  visible: boolean;
  confirmLoading: boolean;
}

const initialState: State = {
  visible: false,
  confirmLoading: false,
};

export const reducer = (
  state: State = initialState, 
  action: CategoryActionsUnion,
): State => {
  switch (action.type) {

    case CategoryActionTypes.OpenCreateModal:
    case CategoryActionTypes.CloseCreateModal:
      return {
        visible: !state.visible,
        confirmLoading: false,
      };
    
    case CategoryActionTypes.Create:
      return {
        ...state,
        confirmLoading: true,
      };
    
    case CategoryActionTypes.CreateSuccess:
      return initialState;
    
    case CategoryActionTypes.CreateFail:
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
