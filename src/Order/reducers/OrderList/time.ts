import * as utils from 'shared/utils';

import {TimePickerOutput} from 'shared/models'
 
import {
  OrderListActionsUnion,
  OrderListActionTypes
} from '../../actions/OrderList';

import {initialTime} from '../../constants'

export interface State {
  timeRange:TimePickerOutput
}

const initialState: State = {
  timeRange : utils.getTimeToolbarPicked(initialTime)
};

export const reducer = (
  state: State = initialState,
  action: OrderListActionsUnion,
): State => {
  switch (action.type) {

    case OrderListActionTypes.SetTimeRange:
      return {
        ...state,
        timeRange: action.payload,
      };
    
    default:
      return state;
  }
};

export const getTimeRange = (state: State): TimePickerOutput => state.timeRange;