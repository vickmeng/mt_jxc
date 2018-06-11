import { SortParams } from '@app/shared/models';

export interface Brand {
  id: number;
  chainId: number;
  tenantId: number;
  productBrandName: string;
  priority: number;
}

export interface BrandEntity {
  id?: number;
  productBrandName: string;
}

export interface BrandSortParams extends SortParams {
  productBrandId: number;
}