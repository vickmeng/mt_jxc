import { BrandActionsUnion, BrandActionTypes } from '../../actions/brand';

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
  action: BrandActionsUnion,
): State => {
  switch (action.type) {

    case BrandActionTypes.OpenCreateModal:
    case BrandActionTypes.CloseCreateModal:
      return {
        visible: !state.visible,
        confirmLoading: false,
      };
    
    case BrandActionTypes.Create:
      return {
        ...state,
        confirmLoading: true,
      };
    
    case BrandActionTypes.CreateSuccess:
      return initialState;
    
    case BrandActionTypes.CreateFail:
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
