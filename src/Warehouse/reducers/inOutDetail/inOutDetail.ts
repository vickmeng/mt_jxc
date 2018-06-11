import {
  InOutDetailActionsUnion,
  InOutDetailActionTypes,
  SetInOutDetailSuccessAction,
} from '../../actions/inOutDetail';

export interface State {
  loading:boolean;
  data:any[];
}

const initialState: State = {
  loading:false,
  data:[{}]
};

export const reducer = (
  state: State = initialState,
  action: InOutDetailActionsUnion,
): State => {
  switch (action.type) {
    case InOutDetailActionTypes.SetInOutDetail:
      return {
        ...state,
        loading:true
      }

    case InOutDetailActionTypes.SetInOutDetailSuccess:
      return {
        ...state,
        loading:false,
        data:(action as SetInOutDetailSuccessAction).payload
      }

    case InOutDetailActionTypes.SetInOutDetailFail:
      return {
        ...state,
        loading:false
      }

    default:
      return state;
  }
};

export const getInOutDetail = (state: State): any => state;

export const getLoading = (state: State): boolean => state.loading;

export const getData = (state: State): any => state.data;
