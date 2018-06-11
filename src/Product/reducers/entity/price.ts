import {
  AddDealerPriceAction,
  LoadAllDealerSuccessAction,
  ProductActionsUnion,
  ProductActionTypes,
  RemoveDealerPriceAction,
  ResetSelectDealerAction,
  SelectDealerAction,
  UpdateDealerLevelOrderCostAction,
  UpdateDealerLevelOrderPriceAction,
  UpdateDealerLevelPriceAllowPurchaseAction,
  UpdateDealerLevelPriceListAction,
  UpdateDealerOrderCostAction,
  UpdateDealerOrderPriceAction,
  UpdateDealerPriceAllowPurchaseAction,
  UpdateDealerPriceListAction,
  UpdatePriceAction,
} from '../../actions/product';
import { Dealer, DealerLevelPrice, DealerPrice } from '../../models';

export interface State {
  price: number;
  dealerLevelPriceList: DealerLevelPrice[];
  dealerPriceList: DealerPrice[];
  hasDealerPrice: boolean;
  dealers: Dealer[];
}

const initialState: State = {
  price: 0,
  dealerLevelPriceList: [],
  dealerPriceList: [],
  hasDealerPrice: false,
  dealers: [],
};

const getDealerPrice = ():DealerPrice => ({
  tenantId: +new Date(),
  name: '',
  levelName: '',
  isAllowPurchase: true,
  orderPrice: 0,
  orderCount: 0,
});

const updateDealerLevelPrice = (
  state: DealerLevelPrice[],
  action: ProductActionsUnion,
): DealerLevelPrice[] => {
  switch (action.type) {

    case ProductActionTypes.UpdateDealerLevelAllowPurchase:
      return state.map(item => {
        if (item.tenantLevelId === (action as UpdateDealerLevelPriceAllowPurchaseAction).payload) {
          return {
            ...item,
            isAllowPurchase: !item.isAllowPurchase,
          };
        }
        return item;
      });

    case ProductActionTypes.UpdateDealerLevelOrderPrice:
      return state.map(item => {
        if (item.tenantLevelId === (action as UpdateDealerLevelOrderPriceAction).payload.id) {
          return {
            ...item,
            orderPrice: (action as UpdateDealerLevelOrderPriceAction).payload.value,
          };
        }
        return item;
      });

      case ProductActionTypes.UpdateDealerLevelOrderCost:
      return state.map(item => {
        if (item.tenantLevelId === (action as UpdateDealerLevelOrderCostAction).payload.id) {
          return {
            ...item,
            orderCount: (action as UpdateDealerLevelOrderCostAction).payload.value,
          };
        }
        return item;
      });

    default:
      return state;
  }
};

const updateDealerPrice = (
  state: State,
  action: ProductActionsUnion
): DealerPrice[] => {
  switch (action.type) {

    case ProductActionTypes.ToggleHasDealerPrice:
      if (!state.hasDealerPrice) {
        if (!state.dealerPriceList.length) {
          return [ getDealerPrice() ];
        }
      } else {
        return [];
      }
    
    case ProductActionTypes.UpdateDealerAllowPurchase:
      return state.dealerPriceList.map(item => {
        if (item.tenantId === (action as UpdateDealerPriceAllowPurchaseAction).payload) {
          return {
            ...item,
            isAllowPurchase: !item.isAllowPurchase,
          };
        }
        return item;
      });

    case ProductActionTypes.UpdateDealerOrderPrice:
      return state.dealerPriceList.map(item => {
        if (item.tenantId === (action as UpdateDealerOrderPriceAction).payload.id) {
          return {
            ...item,
            orderPrice: (action as UpdateDealerOrderPriceAction).payload.value,
          };
        }
        return item;
      });

    case ProductActionTypes.UpdateDealerOrderCost:
      return state.dealerPriceList.map(item => {
        if (item.tenantId === (action as UpdateDealerOrderCostAction).payload.id) {
          return {
            ...item,
            orderCount: (action as UpdateDealerOrderCostAction).payload.value,
          };
        }
        return item;
      });

    case ProductActionTypes.RemoveDealerPrice:
      return state.dealerPriceList.filter(item => item.tenantId !== (action as RemoveDealerPriceAction).payload);

    case ProductActionTypes.AddDealerPrice:
      const addIndex = (action as AddDealerPriceAction).payload + 1;
      return [
        ...state.dealerPriceList.slice(0, addIndex),
        getDealerPrice(),
        ...state.dealerPriceList.slice(addIndex),
      ];

    case ProductActionTypes.SelectDealer:
      const payload = (action as SelectDealerAction).payload;
      const { index, selectedDealer } = payload;
      return state.dealerPriceList.map((item: DealerPrice, i: number) => {
        if (index === i) {
          return {
            ...item,
            tenantId: selectedDealer.tenantId,
            name: selectedDealer.tenantName,
            levelName: selectedDealer.tenantLevelName,
          };
        }
        return item;
      });
    
    case ProductActionTypes.ResetSelectDealer:
      return state.dealerPriceList.map((item: DealerPrice, i: number) => {
        if ((action as ResetSelectDealerAction).payload === i) {
          return {
            ...item,
            tenantId: +new Date(),
            name: '',
            levelName: '',
          };
        }
        return item;
      });

    default:
      return state.dealerPriceList;
  }
}

export const reducer = (
  state: State = initialState,
  action: ProductActionsUnion,
): State => {
  switch (action.type) {

    case ProductActionTypes.UpdatePrice:
      return {
        ...state,
        price: (action as UpdatePriceAction).payload,
      };

    case ProductActionTypes.UpdateDealerLevelPriceList:
      return {
        ...state,
        dealerLevelPriceList: (action as UpdateDealerLevelPriceListAction).payload,
      };

    case ProductActionTypes.UpdateDealerPriceList:
      return {
        ...state,
        dealerPriceList: (action as UpdateDealerPriceListAction).payload,
      };

    case ProductActionTypes.UpdateDealerLevelAllowPurchase:
    case ProductActionTypes.UpdateDealerLevelOrderPrice:
    case ProductActionTypes.UpdateDealerLevelOrderCost:
      return {
        ...state,
        dealerLevelPriceList: updateDealerLevelPrice(state.dealerLevelPriceList, action),
      };

    case ProductActionTypes.ToggleHasDealerPrice:
      return {
        ...state,
        hasDealerPrice: !state.hasDealerPrice,
        dealerPriceList: updateDealerPrice(state, action),
      };

    case ProductActionTypes.LoadAllDealerSuccess:
      return {
        ...state,
        dealers: (action as LoadAllDealerSuccessAction).payload,
      };

    case ProductActionTypes.UpdateDealerAllowPurchase:
    case ProductActionTypes.UpdateDealerOrderPrice:
    case ProductActionTypes.UpdateDealerOrderCost:
    case ProductActionTypes.AddDealerPrice:
    case ProductActionTypes.RemoveDealerPrice:
    case ProductActionTypes.SelectDealer:
    case ProductActionTypes.ResetSelectDealer:
      return {
        ...state,
        dealerPriceList: updateDealerPrice(state, action),
      };

    default:
      return state;
  }
};

export const getPrice = (state: State): number => state.price;

export const getDealerLevelPriceList = (state: State): DealerLevelPrice[] => state.dealerLevelPriceList;

export const getDealerPriceList = (state: State): DealerPrice[] => state.dealerPriceList;

export const getHasDealerPrice = (state: State): boolean => state.hasDealerPrice;

export const getDealers = (state: State): Dealer[] => state.dealers;
