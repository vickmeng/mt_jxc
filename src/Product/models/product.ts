import { Moment } from 'moment';

export interface Product {
  productId: number;
  productName: string;
  productNO: string;
  productImage: string;
  productCategoryId: number;
  productCategoryName: string;
  productBrandId: number;
  productBrandName: string;
  productUnitId: number;
  productUnitName: string;
  isOnline: boolean;
  specification: string;
  price: number;
  cost: number;
  stockCount: null;
  stockCost: null;
}

export interface OnShelfFormValue {
  isImmediately: boolean;
  time: Moment;
}

export interface OnShelfParams {
  productIds: number[];
  isOnline: boolean;
  onlineTime?: number;
}

export interface DealerLevelPrice {
  tenantLevelId: number;
  isAllowPurchase: boolean;
  orderPrice: number;
  orderCount: number;
  name: string;
  discount: number;
}

export interface DealerPrice {
  tenantId: number;
  isAllowPurchase: boolean;
  orderPrice: number;
  orderCount: number;
  name: string;
  levelName: string;
}

export interface NumberablePayload {
  id: number;
  value: number;
}

export interface Dealer {
  tenantId: number;
  tenantName: string;
  tenantLevelName: string;
}

export interface SelectDealerPayload {
  index: number;
  selectedDealer: Dealer;
}

export interface DealerLevelPriceParams {
  tenantLevelId: number;
  isAllowPurchase: boolean;
  orderPrice: number;
  orderCount: number;
}

export interface DealerPriceParams {
  tenantId: number;
  isAllowPurchase: boolean;
  orderPrice: number;
  orderCount: number;
}

export interface ProductFormValues {
  productName: string;
  productNO: string;
  productBrandId: number;
  productCategoryId: number;
  productUnitId: number;
  productBarCode?: string;
  price: number;
  cost: number;
  priority?: number;
  isImmediately: string;
  time?: Moment;
}

export interface ProductParams {
  productName: string;
  productNO: string;
  productBrandId: number;
  productCategoryId: number;
  productUnitId: number;
  productBarCode?: string;
  price: number;
  cost: number;
  description: string;
  productImage: string;
  attach: string;
  priority?: number;
  isOnline: boolean;
  onlineTime?: number;
  productTenantList: Array<DealerLevelPriceParams | DealerPriceParams>;
}

export interface ProductInfo {
  productNO: string;
  productName: string;
  productCategoryId: number;
  productBrandId: number;
  productUnitId: number;
  productImage: string;
  productBarCode: string;
  priority: number;
  description: string;
  attach: string;
  price: number;
  cost: number;
  isOnline: boolean;
  onlineTime?: number;
}

export type ProductPrice = DealerLevelPriceParams | DealerPriceParams;

export interface ProductEntity {
  basic: ProductInfo;
  price: ProductPrice[];
}