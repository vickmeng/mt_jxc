interface ProductVos {
    productId:number;
    stockCount:number;
    productRemark?:string;
  }

export interface CreateTransferParams {
    stockOutWarehouseId:number;
    stockInWarehouseId:number;
    stockNO:string,
    stockOutTime:number;
    productVos:ProductVos[];
    stockRemark?:string,
}





