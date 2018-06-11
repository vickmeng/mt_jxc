import {
  OpenModalAction,
  StockInActionsUnion,
  StockInActionTypes,
} from '../../actions/stockInModal';
import {StockInModalParams} from '../../models'


export interface State {
  row:StockInModalParams;
  visable:boolean;
  loading:boolean;
}

const initialState: State = {
  row:({} as StockInModalParams),
  visable:false,
  loading:false,
};

export const reducer = (
  state: State = initialState,
  action: StockInActionsUnion,
): State => {
  switch (action.type) {
    case StockInActionTypes.OpenModal:
      return {
        ...state,
        visable:true,
        row:(action as OpenModalAction).payload
      } 

    case StockInActionTypes.CloseModal:
      return {
        ...state,
        visable:false,
      } 

    case StockInActionTypes.StockIn:
      return {
        ...state,
        loading:true
      }

    case StockInActionTypes.StockInSuccess:
      return {
        ...state,
        loading:false,
        visable:false,
      }

    case StockInActionTypes.StockInFail:
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