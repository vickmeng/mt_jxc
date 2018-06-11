import {
  OpenModalAction,
  StockCancelActionsUnion,
  StockCancelActionTypes,
} from '../../actions/stockCancelModal';

import {StockCancelModalParams} from '../../models'

export interface State {
  row:StockCancelModalParams;
  visable:boolean;
  loading:boolean;
}

const initialState: State = {
  row:({} as StockCancelModalParams),
  visable:false,
  loading:false,
};

export const reducer = (
  state: State = initialState,
  action: StockCancelActionsUnion,
): State => {
  switch (action.type) {
    case StockCancelActionTypes.OpenModal:
      return {
        ...state,
        visable:true,
        row:(action as OpenModalAction).payload
      } 

    case StockCancelActionTypes.CloseModal:
      return {
        ...state,
        visable:false,
      } 

    case StockCancelActionTypes.StockCancel:
      return {
        ...state,
        loading:true
      }

    case StockCancelActionTypes.StockCancelSuccess:
      return {
        ...state,
        loading:false,
        visable:false,
      }

    case StockCancelActionTypes.StockCancelFail:
      return {
        ...state,
        loading:false,
      }

    default:
      return state;
  }
};

export const getStockIn = (state: State): any => state;
export const getVisable = (state: State): boolean => state.visable;
export const getLoading = (state: State): boolean => state.loading;
export const getRow = (state: State) => state.row;