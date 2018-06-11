import * as utils from 'shared/utils';

import {
  OutActionsUnion,
  OutActionTypes
} from '../../actions/out';

import {initialTime} from '../../constants/InOut'



export interface State {
  timeRange:any
}


const initialState: State = {
  timeRange : utils.getTimeToolbarPicked(initialTime)
};

export const reducer = (
  state: State = initialState,
  action: OutActionsUnion,
): State => {
  switch (action.type) {

    case OutActionTypes.SetTimeRange:
      return {
        ...state,
        timeRange: action.payload,
      };
    
    default:
      return state;
  }
};

export const getTimeRange = (state: State): any => state.timeRange;