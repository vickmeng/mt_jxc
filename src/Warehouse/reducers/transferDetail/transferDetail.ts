import {
  SetTransferDetailSuccessAction,
  SetTransferOperatelogSuccessAction,

  TransferDetailActionsUnion,
  TransferDetailActionTypes,
} from '../../actions/transferDetail';

export interface State {
  loading:boolean;
  detailData:any[];
  log:any[];
}

const initialState: State = {
  loading:false,
  detailData:[{}],
  log:[{}]
};

export const reducer = (
  state: State = initialState,
  action: TransferDetailActionsUnion,
): State => {
  switch (action.type) {
    case TransferDetailActionTypes.SetTransferDetail:
      return {
        ...state,
        loading:true
      }

    case TransferDetailActionTypes.SetTransferDetailSuccess:
      return {
        ...state,
        loading:false,
        detailData:(action as SetTransferDetailSuccessAction).payload
      }

    case TransferDetailActionTypes.SetTransferDetailFail:
      return {
        ...state,
        loading:false
      }


    case TransferDetailActionTypes.SetTransferOperatelog:
      return {
        ...state,
        loading:true
      }

    case TransferDetailActionTypes.SetTransferOperatelogSuccess:
      return {
        ...state,
        loading:false,
        log:(action as SetTransferOperatelogSuccessAction).payload
      }

    case TransferDetailActionTypes.SetTransferOperatelogFail:
      return {
        ...state,
        loading:false
      }    

    default:
      return state;
  }
};

export const getTransferDetail = (state: State): any => state;

export const getLoading = (state: State): boolean => state.loading;

export const getDetailData = (state: State): any => state.detailData;

export const getLog = (state: State): any => state.log;
