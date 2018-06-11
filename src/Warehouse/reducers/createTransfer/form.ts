import {
  CreateTransferActionsUnion,
  CreateTransferActionTypes,
} from '../../actions/createTransfer';

export interface State {
  saving:boolean
}

const initialState: State = {
  saving:false,
};

export const reducer = (
  state: State = initialState,
  action: CreateTransferActionsUnion,
): State => {
  switch (action.type) {
    case CreateTransferActionTypes.CreateTransfer:
      return {
        ...state,
        saving:true
      }

    case CreateTransferActionTypes.CreateTransferSuccess:
      return {
        ...state,
        saving:false
      }

    case CreateTransferActionTypes.CreateTransferFail:
      return {
        ...state,
        saving:false
      }

    default:
      return state;
  }
};

export const getCreateTransfer = (state: State): any => state;

export const getSaving = (state: State): boolean => state.saving;