import { WarehouseActionsUnion, WarehouseActionTypes } from '../../actions/warehouse';

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
  action: WarehouseActionsUnion,
): State => {
  switch (action.type) {

    case WarehouseActionTypes.OpenCreateModal:
      return {
        ...state,
        visible: true,
      };
    
    case WarehouseActionTypes.CloseCreateModal:
      return {
        ...state,
        visible: false,
      };
      
    case WarehouseActionTypes.Create:
      return {
        ...state,
        confirmLoading: true,
      };

    case WarehouseActionTypes.CreateSuccess:
      return initialState;

    case WarehouseActionTypes.CreateFail:
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
