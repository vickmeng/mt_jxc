import * as moment from 'moment';

import {
  LoadSuccessAction,
  ProductActionsUnion,
  ProductActionTypes,
} from '../../actions/product';
import { ProductFormValues, ProductInfo } from '../../models';

const getBasicValue = (basic: ProductInfo): ProductFormValues => {
  return {
    productNO: basic.productNO,
    productName: basic.productName,
    productCategoryId: basic.productCategoryId,
    productBrandId: basic.productBrandId,
    productUnitId: basic.productUnitId,
    priority: basic.priority,
    price: basic.price,
    cost: basic.cost,
    isImmediately: basic.isOnline ? (basic.onlineTime ? 'timing' : 'now' ): 'later',
    time: basic.onlineTime ? moment(basic.onlineTime) : undefined,
  };
};

export interface State {
  values: ProductFormValues | null;
}

const initialState: State = {
  values: null,
};

export const reducer = (
  state: State = initialState,
  action: ProductActionsUnion,
): State => {
  switch (action.type) {

    case ProductActionTypes.LoadSuccess:
      return {
        values: getBasicValue((action as LoadSuccessAction).payload.basic)
      };

    default:
      return state;
  }
};

export const getValues = (state: State): ProductFormValues | null => state.values;
