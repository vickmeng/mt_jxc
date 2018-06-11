import * as utils from 'shared/utils';

import {TimePickerOutput} from 'shared/models'
 
import {
  TransferActionsUnion,
  TransferActionTypes
} from '../../actions/transfer';

import {initialTime} from '../../constants/InOut'

export interface State {
  timeRange:TimePickerOutput
}

const initialState: State = {
  timeRange : utils.getTimeToolbarPicked(initialTime)
};

export const reducer = (
  state: State = initialState,
  action: TransferActionsUnion,
): State => {
  switch (action.type) {

    case TransferActionTypes.SetTimeRange:
      return {
        ...state,
        timeRange: action.payload,
      };
    
    default:
      return state;
  }
};

export const getTimeRange = (state: State): TimePickerOutput => state.timeRange;