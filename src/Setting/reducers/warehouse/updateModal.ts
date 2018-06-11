import {
  OpenUpdateModalAction,
  WarehouseActionsUnion,
  WarehouseActionTypes,
} from '../../actions/warehouse';
import { Warehouse } from '../../models';

export interface State {
  visible: boolean;
  confirmLoading: boolean;
  editedEntity: Warehouse | null;
}

const initialState: State = {
  visible: false,
  confirmLoading: false,
  editedEntity: null,
};

export const reducer = (
  state: State = initialState,
  action: WarehouseActionsUnion,
): State => {
  switch (action.type) {

    case WarehouseActionTypes.OpenUpdateModal:
      return {
        visible: true,
        confirmLoading: false,
        editedEntity: (action as OpenUpdateModalAction).payload,
      };

    case WarehouseActionTypes.CloseUpdateModal:
      return initialState;

    case WarehouseActionTypes.Update:
      return {
        ...state,
        confirmLoading: true,
      };

    case WarehouseActionTypes.UpdateSuccess:
      return initialState;

    case WarehouseActionTypes.UpdateFail:
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

export const getEditedEntity = (state: State): Warehouse | null =>state.editedEntity;
