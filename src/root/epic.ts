import { combineEpics } from 'redux-observable';

import { 
  orderDetailEpics,
  orderListEpics,
} from '@app/Order/epics'

import { productEpics } from '@app/Product/epics';
import { settingEpics } from '@app/Setting/epics';
import { 
  commonEpics,
  createInOutEpics,
  createTransferEpics,
  inEpics,
  inOutDetailEpics,
  inOutListEpics,
  inventoryEpics,
  outEpics,
  stockCancelEpics,
  stockInEpics,
  transferDetailEpics,
  transferEpics,
  } from '@app/Warehouse/epics';

export const rootEpic = combineEpics(
  // 订单相关start
  ...orderDetailEpics,...orderListEpics,
  // 订单相关end
  ...productEpics,
  ...settingEpics,
  // 库存相关start
  ...commonEpics,...createInOutEpics,...inventoryEpics, ...inEpics, ...outEpics, ...inOutDetailEpics,
  ...inOutListEpics,...transferEpics,...transferDetailEpics,...createTransferEpics,...stockInEpics,...stockCancelEpics,
  // 库存相关end
);