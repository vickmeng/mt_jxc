import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  Delete,
  DeleteAction,
  LoadAll,
  LoadAllAction,
  OpenUpdateModal,
  OpenUpdateModalAction,
  Sort,
  SortAction,
} from '../../actions/brand';
import { Brand, BrandEntity, BrandSortParams } from '../../models';
import * as fromSetting from '../../reducers';
import { BrandTableWarpper } from './Table';

interface Props {
  brands: Brand[];
  loading: boolean;
  loadAll: () => LoadAllAction;
  openUpdateModal: (brand: BrandEntity) => OpenUpdateModalAction;
  deleteById: (brandId: number) => DeleteAction;
  sort: (sortParams: BrandSortParams) => SortAction;
}

class Container extends React.Component<Props> {

  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    return <BrandTableWarpper { ...this.props } />
  }
}

const mapStateToProps = (state: State) => ({
  brands: fromSetting.getBrands(state),
  loading: fromSetting.getBrandLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: () => dispatch(LoadAll()),
  openUpdateModal: (brand: Brand) => dispatch(OpenUpdateModal(brand)),
  deleteById: (brandId: number) => dispatch(Delete(brandId)),
  sort: (sortParams: BrandSortParams) => dispatch(Sort(sortParams)),
});

export const BrandTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

