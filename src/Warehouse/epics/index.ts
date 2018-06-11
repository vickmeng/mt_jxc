import {
  loadBrandsEpic as loadBrandsEpicCommon,
  loadCategoriesEpic as loadCategoriesEpicCommon,
  loadProductsEpic as loadProductsEpicCommon,
  loadStockCodeEpic as loadStockCodeEpicCommon,
  loadStockTypesEpic as loadStockTypesEpicCommon,
  loadTransferStatusEpic as loadTransferStatusEpicCommon,
  loadWarehousesEpic  as loadWarehousesEpicCommon,
} from './common';

import { 
  loadInventoriesEpic,
   } from './inventory';

import { 
  loadTableDataEpic  as loadTableDataEpicIn,
   } from './in';

import { 
  loadTableDataEpic  as loadTableDataEpicOut,
  } from './out';

import {
  CreateInOutEpic
} from './createInOut';

import {
  SetInOutDetailEpic
} from './inOutDetail';

import { 
  loadTableDataEpic  as loadTableDataEpicTransfer,
   } from './transfer';

   import {
    CreateTransferEpic
  } from './createTransfer';


import {
  SetTransferDetailEpic as SetTransferDetailEpicTransferDetail,
  SetTransferOperatelogEpic as SetTransferOperatelogEpicTransferDetail,
} from './transferDetail'

import { 
  StockInEpic,
  } from './stockInModal';

  import { 
    StockCancelEpic
    } from './stockCancelModal';

import { 
  loadTableDataEpic  as loadTableDataEpicInOutList,
   } from './inOutList';

export const commonEpics = [
  loadBrandsEpicCommon,
  loadCategoriesEpicCommon,
  loadProductsEpicCommon,
  loadStockTypesEpicCommon,
  loadWarehousesEpicCommon,
  loadTransferStatusEpicCommon,
  loadStockCodeEpicCommon,
];

export const inventoryEpics = [
  loadInventoriesEpic,
];

export const inEpics = [
  loadTableDataEpicIn,
];

export const outEpics = [
  loadTableDataEpicOut,
];

export const createInOutEpics = [
  CreateInOutEpic,
];

export const inOutDetailEpics = [
  SetInOutDetailEpic,
];

export const transferEpics = [
  loadTableDataEpicTransfer,
];

export const createTransferEpics = [
  CreateTransferEpic,
];

export const transferDetailEpics = [
  SetTransferDetailEpicTransferDetail,
  SetTransferOperatelogEpicTransferDetail
];

export const stockInEpics = [
  StockInEpic
]

export const stockCancelEpics = [
  StockCancelEpic
]

export const inOutListEpics = [
  loadTableDataEpicInOutList,
];
