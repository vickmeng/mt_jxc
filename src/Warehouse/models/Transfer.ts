export interface TransferDetailParams {
    transferStockId:number;
}

export interface StockInModalParams {
    stockTransferId:number;
    stockNO:string | number;
    stockInWarehouseName:string;
}


export interface StockCancelParams {
    stockTransferId:number;
    stockRemark:string
}


export interface StockCancelModalParams {
    stockTransferId:number;
    stockNO:string | number;
}

