export interface EditableInventoryTableColumnProps {
    key:number
    index:number,
    productId:number ;// ID
    productNO:string ; // 编码
    productUnitName:string;// 单位
    specification:string;// 规格
    stockCount:number // 库存
    productRemark:string;// 备注
  }