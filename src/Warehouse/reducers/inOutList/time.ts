import * as utils from 'shared/utils';

import {
  InOutListActionsUnion,
  InOutListActionTypes
} from '../../actions/inOutList';

import {initialTime} from '../../constants/InOut'

export interface State {
  timeRange:any
}

const initialState: State = {
  timeRange : utils.getTimeToolbarPicked(initialTime)
};

export const reducer = (
  state: State = initialState,
  action: InOutListActionsUnion,
): State => {
  switch (action.type) {

    case InOutListActionTypes.SetTimeRange:
      return {
        ...state,
        timeRange: action.payload,
      };
    
    default:
      return state;
  }
};

export const getTimeRange = (state: State): any => state.timeRange;