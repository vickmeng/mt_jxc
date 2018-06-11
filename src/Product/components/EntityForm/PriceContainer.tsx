import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FormComponentProps } from 'antd/lib/form';

import { State } from '@app/root';
import {
  LoadAll as LoadDealerLevles,
} from '@app/Setting/actions/dealerLevel';
import {
  AddDealerPrice,
  LoadAllDealer,
  RemoveDealerPrice,
  ResetSelectDealer,
  SelectDealer,
  ToggleHasDealerPrice,
  UpdateDealerLevelOrderCost,
  UpdateDealerLevelOrderPrice,
  UpdateDealerLevelPriceAllowPurchase,
  UpdateDealerOrderCost,
  UpdateDealerOrderPrice,
  UpdateDealerPriceAllowPurchase,
  UpdatePrice,
} from '../../actions/product';
import { NumberablePayload, ProductFormValues, SelectDealerPayload } from '../../models';
import * as fromProduct from '../../reducers';
import { PriceSetting } from './Price';

interface Props extends FormComponentProps {
  product?: ProductFormValues;
}

const mapStateToProps = (state: State, ownProps: Props) => ({
  dealerLevelPriceList: fromProduct.getDealerLevelPriceList(state),
  hasDealerPrice: fromProduct.getHasDealerPrice(state),
  dealerPriceList: fromProduct.getDealerPriceList(state),
  dealers: fromProduct.getDealers(state),
  ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePrice: (price: number) => dispatch(UpdatePrice(price)),
  loadDealerLevles: () => dispatch(LoadDealerLevles()),
  updateDealerLevelAllowPurchase: (id: number) => dispatch(UpdateDealerLevelPriceAllowPurchase(id)),
  updateDealerLevelPrice: (payload: NumberablePayload) => dispatch(UpdateDealerLevelOrderPrice(payload)),
  updateDealerLevelCost: (payload: NumberablePayload) => dispatch(UpdateDealerLevelOrderCost(payload)),
  toggleHasDealerPrice: () => dispatch(ToggleHasDealerPrice()),
  loadDealers: () => dispatch(LoadAllDealer()),
  updateDealerAllowPurchase: (id: number) => dispatch(UpdateDealerPriceAllowPurchase(id)),
  updateDealerPrice: (payload: NumberablePayload) => dispatch(UpdateDealerOrderPrice(payload)),
  updateDealerCost: (payload: NumberablePayload) => dispatch(UpdateDealerOrderCost(payload)),
  addDealerPrice: (index: number) => dispatch(AddDealerPrice(index)),
  removeDealerPrice: (id: number) => dispatch(RemoveDealerPrice(id)),
  selectDealer: (payload: SelectDealerPayload) => dispatch(SelectDealer(payload)),
  resetDealer: (index: number) => dispatch(ResetSelectDealer(index)),
});

export const PriceSettingContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PriceSetting);

