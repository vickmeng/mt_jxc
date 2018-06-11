import { SortParams } from '@app/shared/models';

export interface Category {
  id: number;
  chainId: number;
  tenantId: number;
  productCategoryName: string;
  priority: number;
}

export interface CategoryEntity {
  id?: number;
  productCategoryName: string;
}

export interface CategorySortParams extends SortParams {
  productCategoryId: number;
}
