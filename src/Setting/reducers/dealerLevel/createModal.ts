import { DealerLevelActionsUnion, DealerLevelActionTypes } from '../../actions/dealerLevel';

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
  action: DealerLevelActionsUnion,
): State => {
  switch (action.type) {

    case DealerLevelActionTypes.OpenCreateModal:
    case DealerLevelActionTypes.CloseCreateModal:
      return {
        ...state,
        visible: !state.visible,
      };
    
    case DealerLevelActionTypes.Create:
      return {
        ...state,
        confirmLoading: true,
      };

    case DealerLevelActionTypes.CreateSuccess:
      return initialState;
    
    case DealerLevelActionTypes.CreateFail:
      return {
        ...state,
        confirmLoading: false,
      };

    default:
      return state;
  }
}

export const getVisible = (state: State): boolean => state.visible;

export const getConfirmLoading = (state: State): boolean => state.confirmLoading;
