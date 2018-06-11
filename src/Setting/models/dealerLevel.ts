import { SortParams } from '@app/shared/models';

export interface DealerLevel {
  id: number;
  chainId: number;
  tenantId: number;
  tenantLevelName: string;
  priority: number;
  discount: number;
}

export interface DealerLevelEntity {
  tenantLevelId?: number;
  tenantLevelName: string;
  discount: string;
}

export interface DealerLevelSortParams extends SortParams {
  tenantLevelId: number;
}