import { UploadFile } from 'antd/lib/upload/interface';

import { imageHost } from '@app/shared/constants';

import { DealerLevel } from '@app/Setting/models';
import {
  Dealer,
  DealerLevelPrice,
  DealerLevelPriceParams,
  DealerPrice,
  DealerPriceParams,
  ProductFormValues,
  ProductParams,
} from '../models';
import { State as EntityState } from '../reducers/entity';
import { State as PriceState } from '../reducers/entity/price';

export const mapToDealerLevelPriceList = (dealerLevels: DealerLevel[]): DealerLevelPrice[] => 
  dealerLevels.map(dealerLevel => ({
    tenantLevelId: dealerLevel.id,
    name: dealerLevel.tenantLevelName,
    discount: dealerLevel.discount,
    isAllowPurchase: true,
    orderPrice: 0,
    orderCount: 0,
  }));

export const mapToDealerPriceList = (dealers: Dealer[]): DealerPrice[] =>
  dealers.map(dealer => ({
    tenantId: dealer.tenantId,
    name: dealer.tenantName,
    levelName: dealer.tenantLevelName,
    isAllowPurchase: true,
    orderPrice: 0,
    orderCount: 0,
  }));

export const mapToDealerPrice = (dealer: Dealer): DealerPrice => ({
    tenantId: dealer.tenantId,
    name: dealer.tenantName,
    levelName: dealer.tenantLevelName,
    isAllowPurchase: true,
    orderPrice: 0,
    orderCount: 0,
  });

const mapToDealerLevelParams = (dealerLevelPrice: DealerLevelPrice): DealerLevelPriceParams => ({
  tenantLevelId: dealerLevelPrice.tenantLevelId,
  isAllowPurchase: dealerLevelPrice.isAllowPurchase,
  orderPrice: dealerLevelPrice.orderPrice,
  orderCount: dealerLevelPrice.orderCount,
});

const mapToDealerParams = (dealerPrice: DealerPrice): DealerPriceParams => ({
  tenantId: dealerPrice.tenantId,
  isAllowPurchase: dealerPrice.isAllowPurchase,
  orderPrice: dealerPrice.orderPrice,
  orderCount: dealerPrice.orderCount,
});

const getPriceList = (state: PriceState): Array<DealerLevelPriceParams | DealerPriceParams> => {
  return [
    ...state.dealerLevelPriceList.map(mapToDealerLevelParams),
    ...(state.hasDealerPrice ? state.dealerPriceList.map(mapToDealerParams) : []),
  ];
};

export const getProductParams = (formValues: ProductFormValues, entity: EntityState): ProductParams => {
  return {
    productName: formValues.productName,
    productNO: formValues.productNO,
    productBrandId: formValues.productBrandId,
    productCategoryId: formValues.productCategoryId,
    productUnitId: formValues.productUnitId,
    productBarCode: formValues.productBarCode,
    price: formValues.price,
    cost: formValues.cost,
    priority: formValues.priority,
    isOnline: formValues.isImmediately !== 'later' ? true : false,
    onlineTime: formValues.time ? +formValues.time : undefined,
    description: entity.description,
    productImage: entity.images.fileList.map(image => image.filename).join(),
    attach: entity.documents.fileList.map(document => document.filename).join(),
    productTenantList: getPriceList(entity.price),
  };
};

export const mapToFileList = (fileListStr: string): UploadFile[] => {
  const timestamp = +new Date();
  return fileListStr.split(',').map((url: string, index: number) => ({
    uid: timestamp + index,
    status: 'done',
    name: url,
    filename: url,
    url: `${imageHost}/${url}`,
  }) as UploadFile);
};