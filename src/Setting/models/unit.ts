export interface Unit {
  id: number;
  chainId: number;
  tenantId: number;
  productUnitName: string;
  priority: number;
}

export interface UnitEntity {
  id?: number;
  productUnitName: string;
}