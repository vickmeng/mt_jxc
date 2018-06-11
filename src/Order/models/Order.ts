import {Payload} from 'shared/models';

export interface OrderAddrParams {
    receiver: string;
    mobile: string;
    phone: string;
    addr: string;
}
export interface OrderRemark {
    created: number;
    operator: string;
    remark: string;
    tenantName: string;
}

export interface OrderAddRemarkParams extends Payload<{remark:string}>{
    orderId: string;
}

export interface OrderChangeStatusParams extends Payload<{remark?:string,checkOperate:StatusChangeType}>{
    orderId: string;
}

export interface DeleteOrderParams extends Payload<any>{
    orderId: string;
}

export interface OrderSKParams extends Payload<any>{
}

export interface OrderChangeProductRemarkParams {
    orderId: string;
    productId: string;
    remark:string;
}

export type orderStatusType = 'DDZT_DDDSH' | 'DDZT_DCWSH' | 'DDZT_DCKSH' | 'DDZT_DFHQR' | 'DDZT_DSHQR' | 'DDZT_YWC' | 'DDZT_YZF';
export type StatusChangeType = 'SHTG' | 'TH' | 'ZF';
export type stockStatusType = 'CKZT_BHZ' | 'CKZT_BFCK' | 'CKZT_YCK';
export type payStatusType = 'ZFZT_WFK' | 'ZFZT_FKDSH' | 'ZFZT_YFK' | 'ZFZT_YZF' | 'ZFZT_BFFK';

export interface OrderRow {
    cargoStatus:string;
    created:number;
    isSale:false;
    orderCode:string;
    orderId:string;
    orderStatus:orderStatusType;
    payStatus:payStatusType;
    realFee:79.9;
    stockStatus:stockStatusType;
    tenantId:number;
    tenantName:string;
  }