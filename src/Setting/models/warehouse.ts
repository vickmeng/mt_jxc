export interface Warehouse {
  warehouseId: number;
  warehouseName: string;
  warehouseNO: string;
  warehouseLocation?: string;
  isLock: boolean;
  isDefault: boolean;
}

export interface WarehouseEntity {
  warehouseId?: number;
  warehouseName: string;
  warehouseNO: string;
  warehouseLocation?: string;
}

export interface WarehouseStatus {
  warehouseId: number;
  isLock: boolean;
}
