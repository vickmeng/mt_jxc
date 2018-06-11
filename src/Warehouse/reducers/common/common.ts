import {
  SetBrandsSuccessAction,
  SetCategoriesSuccessAction,
  SetProductsSuccessAction,
  SetStockCodeSuccessAction,
  SetStockTypesSuccessAction,
  SetTransferStatusSuccessAction,
  SetWarehousesSuccessAction,

  WarehousecommonActionsUnion,
  WarehousecommonActionTypes,
} from '../../actions/common';

export interface State {
  brands:any[];
  categories:any[];
  products:any[];
  warehouses:any[];
  stockTypes:any[];
  transferStatus:any[];
  stockCode:string;
}

const initialState: State = {
  brands:[],
  categories:[],
  products:[],
  warehouses:[],
  stockTypes:[],
  transferStatus:[],
  stockCode:''
};

export const reducer = (
  state: State = initialState,
  action: WarehousecommonActionsUnion,
): State => {
  switch (action.type) {

    case WarehousecommonActionTypes.SetBrands:
      return {
        ...state,
      };
      
    case WarehousecommonActionTypes.SetBrandsSuccess:
      return {
        ...state,
        brands:(action as SetBrandsSuccessAction).payload
      };

    case WarehousecommonActionTypes.SetCategories:
      return {
        ...state,
      };
      
    case WarehousecommonActionTypes.SetCategoriesSuccess:
      return {
        ...state,
        categories:(action as SetCategoriesSuccessAction).payload
      };

    case WarehousecommonActionTypes.SetProducts:
      return {
        ...state,
      };
      
    case WarehousecommonActionTypes.SetProductsSuccess:
      return {
        ...state,
        products:(action as SetProductsSuccessAction).payload
      };  

    case WarehousecommonActionTypes.SetWarehouses:
      return {
        ...state,
      };

    case WarehousecommonActionTypes.SetWarehousesSuccess:
      return {
        ...state,
        warehouses:(action as SetWarehousesSuccessAction).payload
      };

    case WarehousecommonActionTypes.SetStockTypes:
      return {
        ...state,
      };

    case WarehousecommonActionTypes.SetStockTypesSuccess:
      return {
        ...state,
        stockTypes:(action as SetStockTypesSuccessAction).payload
      };

    case WarehousecommonActionTypes.SetTransferStatus:
      return {
        ...state,
      };

    case WarehousecommonActionTypes.SetTransferStatusSuccess:
      return {
        ...state,
        transferStatus:(action as SetTransferStatusSuccessAction).payload
      };

    case WarehousecommonActionTypes.SetStockCode:
      return {
        ...state
      };
    
    case WarehousecommonActionTypes.SetStockCodeSuccess:
      return {
        ...state,
        stockCode:(action as SetStockCodeSuccessAction).payload
      };
    
    default:
      return state;
  }
};

export const getForm = (state: State): any => state;

export const getBrands = (state: State): any[] => state.brands;
export const getCategories = (state: State): any[] => state.categories;
export const getProducts = (state: State): any[] => state.products;
export const getWarehouses = (state: State): any[] => state.warehouses;
export const getStockTypes = (state: State): any[] => state.stockTypes;
export const getTransferStatus = (state: State): any[] => state.transferStatus;
export const getStockCode = (state: State): string => state.stockCode;

