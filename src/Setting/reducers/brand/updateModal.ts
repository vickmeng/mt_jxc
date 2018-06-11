import {
  BrandActionsUnion,
  BrandActionTypes,
  OpenUpdateModalAction,
} from '../../actions/brand';
import { Brand } from '../../models';

export interface State {
  visible: boolean;
  confirmLoading: boolean;
  editedEntity: Brand | null;
}

const initialState: State = {
  visible: false,
  confirmLoading: false,
  editedEntity: null,
};

export const reducer = (
  state: State = initialState,
  action: BrandActionsUnion,
): State => {
  switch (action.type) {

    case BrandActionTypes.OpenUpdateModal:
      return {
        visible: true,
        confirmLoading: false,
        editedEntity: (action as OpenUpdateModalAction).payload,
      };
    
    case BrandActionTypes.CloseUpdateModal:
      return initialState;
    
    case BrandActionTypes.Update:
      return {
        ...state,
        confirmLoading: true,
      };
    
    case BrandActionTypes.UpdateSuccess:
      return initialState;
    
    case BrandActionTypes.UpdateFail:
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

export const getEditedEntity = (state: State): Brand | null => state.editedEntity;