import {
  DealerLevelActionsUnion,
  DealerLevelActionTypes,
  OpenUpdateModalAction,
} from '../../actions/dealerLevel';
import { DealerLevel } from '../../models';

export interface State {
  visible: boolean;
  confirmLoading: boolean;
  editedEntity: DealerLevel | null;
}

const initialState: State = {
  visible: false,
  confirmLoading: false,
  editedEntity: null,
};

export const reducer = (
  state: State = initialState,
  action: DealerLevelActionsUnion,
): State => {
  switch (action.type) {

    case DealerLevelActionTypes.OpenUpdateModal:
      return {
        visible: true,
        confirmLoading: false,
        editedEntity: (action as OpenUpdateModalAction).payload,
      };

    case DealerLevelActionTypes.CloseUpdateModal:
      return initialState;

    case DealerLevelActionTypes.Update:
      return {
        ...state,
        confirmLoading: true,
      };

    case DealerLevelActionTypes.UpdateSuccess:
      return initialState;

    case DealerLevelActionTypes.UpdateFail:
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

export const getEditedEntity = (state: State): DealerLevel | null => state.editedEntity;
