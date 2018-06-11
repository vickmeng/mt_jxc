import {
  LoadSuccessAction,
  ProductActionsUnion,
  ProductActionTypes,
  UpdateDescriptionAction,
} from '../../actions/product';

const initialState = '';

export const reducer = (
  state = initialState,
  action: ProductActionsUnion,
): string => {
  switch (action.type) {

    case ProductActionTypes.UpdateDescription:
      return (action as UpdateDescriptionAction).payload;

    case ProductActionTypes.LoadSuccess:
      return (action as LoadSuccessAction).payload.basic.description || '';

    default:
      return state;
  }
};