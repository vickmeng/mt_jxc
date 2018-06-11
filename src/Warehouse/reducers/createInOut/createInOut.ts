import {
  CreateInOutActionsUnion,
  CreateInOutActionTypes,
} from '../../actions/createInOut';

export interface State {
  saving:boolean
}

const initialState: State = {
  saving:false,
};

export const reducer = (
  state: State = initialState,
  action: CreateInOutActionsUnion,
): State => {
  switch (action.type) {
    case CreateInOutActionTypes.CreateInOut:
      return {
        ...state,
        saving:true
      }

    case CreateInOutActionTypes.CreateInOutSuccess:
      return {
        ...state,
        saving:false
      }

    case CreateInOutActionTypes.CreateInOutFail:
      return {
        ...state,
        saving:false
      }

    default:
      return state;
  }
};

export const getCreateInOut = (state: State): any => state;

export const getSaving = (state: State): boolean => state.saving;