import * as utils from 'shared/utils';

import {
  InActionsUnion,
  InActionTypes
} from '../../actions/in';

import {initialTime} from '../../constants/InOut'



export interface State {
  timeRange:any
}


const initialState: State = {
  timeRange : utils.getTimeToolbarPicked(initialTime)
};

export const reducer = (
  state: State = initialState,
  action: InActionsUnion,
): State => {
  switch (action.type) {

    case InActionTypes.SetTimeRange:
      return {
        ...state,
        timeRange: action.payload,
      };
    
    default:
      return state;
  }
};

export const getTimeRange = (state: State): any => state.timeRange;