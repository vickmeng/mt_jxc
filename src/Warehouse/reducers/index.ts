import { combineReducers, Reducer } from 'redux';
import { createSelector } from 'reselect';

import { State as RootState } from '@app/root';

import * as fromCommon from './common';
import * as fromCommonCommon from './common/common';

import * as fromInventory from './inventory';
import * as fromInventories from './inventory/inventory';

import * as fromIn from './in';
import * as fromInTable from './in/table';
import * as fromInTime from './in/time';

import * as fromOut from './out';
import * as fromOutTable from './out/table';
import * as fromOutTime from './out/time';

import * as fromCreateInOut from './createInOut';
import * as fromCreateInOutform from './createInOut/createInOut';

import * as fromInOutDetail from './inOutDetail';
import * as fromInOutDetailData from './inOutDetail/inOutDetail';

import * as fromTransfer from './transfer';
import * as fromTransferTable from './transfer/table';
import * as fromTransferTime from './transfer/time';

import * as fromTransferDetail from './transferDetail';
import * as fromTransferDetailData from './transferDetail/transferDetail';

import * as fromCreateTransfer from './createTransfer';
import * as fromCreateTransferform from './createTransfer/form';


import * as fromStockInModal from './stockInModal';
import * as fromStockInModalAll from './stockInModal/stockInModal';

import * as fromStockCancelModal from './stockCancelModal';
import * as fromStockCancelModalAll from './stockCancelModal/stockCancelModal';

import * as fromInOutList from './inOutList';
import * as fromInOutListTable from './inOutList/table';
import * as fromInOutListTime from './inOutList/time';

export interface State {
  Common:fromCommon.State;
  Inventory: fromInventory.State;
  In: fromIn.State;
  Out: fromOut.State;
  CreateInOut:fromCreateInOut.State;
  InOutDetail:fromInOutDetail.State;
  Transfer:fromTransfer.State;
  TransferDetail:fromTransferDetail.State;
  CreateTransfer:fromCreateTransfer.State;

  StockInModal:fromStockInModal.State;
  StockCancelModal:fromStockCancelModal.State;
  InOutList: fromInOutList.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  Common: fromCommon.reducer,
  Inventory: fromInventory.reducer,
  In:fromIn.reducer,
  Out:fromOut.reducer,
  CreateInOut:fromCreateInOut.reducer,
  InOutDetail:fromInOutDetail.reducer,
  Transfer:fromTransfer.reducer,
  TransferDetail:fromTransferDetail.reducer,
  CreateTransfer:fromCreateTransfer.reducer,
  StockInModal:fromStockInModal.reducer,
  StockCancelModal:fromStockCancelModal.reducer,
  InOutList:fromInOutList.reducer,
});

export const getWarehouseState = (state: RootState): State => state.warehouse;

/*
* common  库存通用 相关 start
*/
export const getCommonState = createSelector(
  getWarehouseState,
  (state: State) => state.Common,
);
export const getCommonBrands = createSelector(
  getCommonState,
  fromCommonCommon.getBrands,
);

export const getCommonCategories = createSelector(
  getCommonState,
  fromCommonCommon.getCategories,
);

export const getCommonProducts = createSelector(
  getCommonState,
  fromCommonCommon.getProducts,
);

export const getCommonStockTypes = createSelector(
  getCommonState,
  fromCommonCommon.getStockTypes,
);

export const getCommonWarehouses = createSelector(
  getCommonState,
  fromCommonCommon.getWarehouses,
);

export const getCommonTransferStatus = createSelector(
  getCommonState,
  fromCommonCommon.getTransferStatus,
);
export const getCommonStockCode = createSelector(
  getCommonState,
  fromCommonCommon.getStockCode,
);

/*
* common  库存通用 相关 end
*/


/**
 *  Inventory 商品库存相关 start
 */
export const getInventoryState = createSelector(
  getWarehouseState,
  (state: State) => state.Inventory,
);
export const getInventoriesState = createSelector(
  getInventoryState,
  (state: fromInventory.State) => state.inventories,
);

export const getInventoryLoaded = createSelector(
  getInventoriesState,
  fromInventories.getLoaded,
);

export const getInventoryLoading = createSelector(
  getInventoriesState,
  fromInventories.getLoading,
);

export const getInventories = createSelector(
  getInventoriesState,
  fromInventories.getInventories,
);

export const getQueryParams = createSelector(
  getInventoriesState,
  fromInventories.getQueryParams,
);

/**
 *  Inventory 商品库存相关 end
 */

/*
* In  入库 相关 start
*/
export const getInState = createSelector(
  getWarehouseState,
  (state: State) => state.In,
);

export const getInTimeState = createSelector(
  getInState,
  (state: fromIn.State) => state.time,
);

export const getInTimeRangeState = createSelector(
  getInTimeState,
  fromInTime.getTimeRange
);

export const getInTableDataState = createSelector(
  getInState,
  (state: fromIn.State) => state.table,
);

export const getInLoaded = createSelector(
  getInTableDataState,
  fromInTable.getLoaded,
);

export const getInLoading = createSelector(
  getInTableDataState,
  fromInTable.getLoading,
);

export const getInTableData = createSelector(
  getInTableDataState,
  fromInTable.getTableData,
);

export const getInQueryParams = createSelector(
  getInTableDataState,
  fromInTable.getQueryParams,
);

/*
* In  入库 相关 end
*/

/*
* Out  出库 相关 start
*/
export const getOutState = createSelector(
  getWarehouseState,
  (state: State) => state.Out,
);

export const getOutTimeState = createSelector(
  getOutState,
  (state: fromOut.State) => state.time,
);

export const getOutTimeRangeState = createSelector(
  getOutTimeState,
  fromOutTime.getTimeRange
);


export const getOutTableDataState = createSelector(
  getOutState,
  (state: fromOut.State) => state.table,
);

export const getOutLoaded = createSelector(
  getOutTableDataState,
  fromOutTable.getLoaded,
);

export const getOutLoading = createSelector(
  getOutTableDataState,
  fromOutTable.getLoading,
);

export const getOutTableData = createSelector(
  getOutTableDataState,
  fromOutTable.getTableData,
);

export const getOutQueryParams = createSelector(
  getOutTableDataState,
  fromOutTable.getQueryParams,
);

/*
* Out  出库 相关 end
*/

/*
* CreateInOut 新建出入库 相关 start
*/
export const getCreateInOutState = createSelector(
  getWarehouseState,
  (state: State) => state.CreateInOut,
);
export const getCreateInOutSaving = createSelector(
  getCreateInOutState,
  fromCreateInOutform.getSaving
);

/*
* CreateInOut 新建出入库 相关 end
*/

/*
* InOutDetail 出入库明细 相关 start
*/
export const getInOutDetailState = createSelector(
  getWarehouseState,
  (state: State) => state.InOutDetail,
);
export const getInOutDetailLoading = createSelector(
  getInOutDetailState,
  fromInOutDetailData.getLoading
);

export const getInOutDetailData = createSelector(
  getInOutDetailState,
  fromInOutDetailData.getData
);

/*
* InOutDetail 出入库明细 相关 end
*/

/*
* Transfer  调拨列表列表 相关 start
*/
export const getTransferState = createSelector(
  getWarehouseState,
  (state: State) => state.Transfer,
);

export const getTransferTimeState = createSelector(
  getTransferState,
  (state: fromTransfer.State) => state.time,
);

export const getTransferTimeRangeState = createSelector(
  getTransferTimeState,
  fromTransferTime.getTimeRange
);

export const getTransferTableDataState = createSelector(
  getTransferState,
  (state: fromTransfer.State) => state.table,
);

export const getTransferLoaded = createSelector(
  getTransferTableDataState,
  fromTransferTable.getLoaded,
);

export const getTransferLoading = createSelector(
  getTransferTableDataState,
  fromTransferTable.getLoading,
);

export const getTransferTableData = createSelector(
  getTransferTableDataState,
  fromTransferTable.getTableData,
);

export const getTransferQueryParams = createSelector(
  getTransferTableDataState,
  fromTransferTable.getQueryParams,
);

/*
* Transfer  调拨列表列表 相关 end
*/


/*
* TransferDetail 调拨明细 相关 start
*/
export const getTransferDetailState = createSelector(
  getWarehouseState,
  (state: State) => state.TransferDetail,
);
export const getTransferDetailLoading = createSelector(
  getTransferDetailState,
  fromTransferDetailData.getLoading
);

export const getTransferDetailDetailData = createSelector(
  getTransferDetailState,
  fromTransferDetailData.getDetailData
);
export const getTransferDetailLog = createSelector(
  getTransferDetailState,
  fromTransferDetailData.getLog
);
/*
* TransferDetail 调拨明细 相关 end
*/

/*
* CreateTransfer 新建调拨 相关 start
*/
export const getCreateTransferState = createSelector(
  getWarehouseState,
  (state: State) => state.CreateTransfer,
);
export const getCreateTransferSaving = createSelector(
  getCreateTransferState,
  fromCreateTransferform.getSaving
);
/*
* CreateTransfer 新建调拨 相关 end
*/

/*
* StockInModal  调拨入库弹窗 相关 start
*/
export const getStockInModalState = createSelector(
  getWarehouseState,
  (state: State) => state.StockInModal,
);
export const getStockInModalLoading = createSelector(
  getStockInModalState,
  fromStockInModalAll.getLoading
);
export const getStockInModalVisable = createSelector(
  getStockInModalState,
  fromStockInModalAll.getVisable
);
export const getStockInModalRow = createSelector(
  getStockInModalState,
  fromStockInModalAll.getRow
);

/*
* StockInModal  调拨入库弹窗 相关 end
*/

/*
* StockCancelModal  调拨入库弹窗 相关 start
*/
export const getStockCancelModalState = createSelector(
  getWarehouseState,
  (state: State) => state.StockCancelModal,
);
export const getStockCancelModalLoading = createSelector(
  getStockCancelModalState,
  fromStockCancelModalAll.getLoading
);
export const getStockCancelModalVisable = createSelector(
  getStockCancelModalState,
  fromStockCancelModalAll.getVisable
);
export const getStockCancelModalRow = createSelector(
  getStockCancelModalState,
  fromStockCancelModalAll.getRow
);

/*
* StockCancelModal  调拨入库弹窗 相关 end
*/

/*
* InOutList  入库明细列表 相关 start
*/
export const getInOutListState = createSelector(
  getWarehouseState,
  (state: State) => state.InOutList,
);

export const getInOutListTimeState = createSelector(
  getInOutListState,
  (state: fromInOutList.State) => state.time,
);

export const getInOutListTimeRangeState = createSelector(
  getInOutListTimeState,
  fromInOutListTime.getTimeRange
);

export const getInOutListTableDataState = createSelector(
  getInOutListState,
  (state: fromInOutList.State) => state.table,
);

export const getInOutListLoaded = createSelector(
  getInOutListTableDataState,
  fromInOutListTable.getLoaded,
);

export const getInOutListLoading = createSelector(
  getInOutListTableDataState,
  fromInOutListTable.getLoading,
);

export const getInOutListTableData = createSelector(
  getInOutListTableDataState,
  fromInOutListTable.getTableData,
);

export const getInOutListQueryParams = createSelector(
  getInOutListTableDataState,
  fromInOutListTable.getQueryParams,
);

/*
* InOutList  入库明细列表 相关 end
*/