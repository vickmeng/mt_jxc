
import {stockKindType} from './InOut'

export interface ProductVos {
    productId:number;
    stockCount:number;
    productRemark?:string;
  }

export interface CreateInOutParams {
    warehouseId:number;
    stockNO:string,
    stockKind:stockKindType,
    productVos:ProductVos[]
    stockTime?:number;
    stockType?:string,
    stockRemark?:string,
}

export interface StockInParams {
    stockTransferId:number;
    stockInTime:number;
}



