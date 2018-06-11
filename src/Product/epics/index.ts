import {
  getDealerLevelPriceListEpic,
  loadDealersEpic,
} from './dealer';
import {
  batchDeleteProductEpic,
  batchSetProductStatusEpic,
  createProductEpic,
  loadProductEpic,
  loadProductsPageEpic,
} from './product';

export const productEpics = [
  batchDeleteProductEpic,
  batchSetProductStatusEpic,
  createProductEpic,
  loadProductEpic,
  loadProductsPageEpic,

  getDealerLevelPriceListEpic,
  loadDealersEpic,
];