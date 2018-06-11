import {
  OpenUpdateModalAction,
  UnitActionsUnion,
  UnitActionTypes,
} from '../../actions/unit';
import { Unit } from '../../models';

export interface State {
  visibile: boolean;
  confirmLoading: boolean;
  editedEntity: Unit | null;
}

const initialState: State = {
  visibile: false,
  confirmLoading: false,
  editedEntity: null,
};

export const reducer = (
  state: State = initialState,
  action: UnitActionsUnion,
): State => {
  switch (action.type) {

    case UnitActionTypes.OpenUpdateModal:
      return {
        visibile: true,
        confirmLoading: false,
        editedEntity: (action as OpenUpdateModalAction).payload,
      };

    case UnitActionTypes.CloseUpdateModal:
      return initialState;

    case UnitActionTypes.Update:
      return {
        ...state,
        confirmLoading: true,
      };
    
    case UnitActionTypes.UpdateSuccess:
      return initialState;
    
    case UnitActionTypes.UpdateFail:
      return {
        ...state,
        confirmLoading: false,
      };

    default:
      return state;
  }
}

export const getVisible = (state: State): boolean => state.visibile;

export const getConfirmLoading = (state: State): boolean => state.confirmLoading;

export const getEditedEntity = (state: State): Unit | null => state.editedEntity;
