import { UnitActionsUnion, UnitActionTypes } from '../../actions/unit';

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
  action: UnitActionsUnion,
): State => {
  switch (action.type) {
    
    case UnitActionTypes.OpenCreateModal:
    case UnitActionTypes.CloseCreateModal:
      return {
        visible: !state.visible,
        confirmLoading: false,
      };
    
    case UnitActionTypes.Create:
      return {
        ...state,
        confirmLoading: true,
      };
    
    case UnitActionTypes.CreateSuccess:
      return initialState;
    
    case UnitActionTypes.CreateFail:
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
