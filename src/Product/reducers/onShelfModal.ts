import {
  ProductActionsUnion,
  ProductActionTypes,
} from '../actions/product';

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
  action: ProductActionsUnion,
): State => {
  switch (action.type) {

    case ProductActionTypes.OpenOnShelfModal:
      return {
        ...state,
        visible: true,
      };

    case ProductActionTypes.CloseOnShelfModal:
      return {
        ...state,
        visible: false,
      };

    default:
      return state;
  }
};

export const getVisible = (state: State): boolean => state.visible;

export const getConfirmLoading = (state: State): boolean => state.confirmLoading;
