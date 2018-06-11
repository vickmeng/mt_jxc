import * as React from 'react';
import { connect } from 'react-redux';
import { push, RouterAction } from 'react-router-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import { ColumnData, Pagination, TableChangeData } from '@app/shared/models';
import {
  ChangeSelectedRowKeys,
  ChangeSelectedRowKeysAction,
  ChangeTable,
  ChangeTableAction,
  LoadAll,
  LoadAllAction,
} from '../actions/product';
import { Product } from '../models';
import * as fromProduct from '../reducers';
import { ProductTableWrapper } from './Table';

interface Props {
  products: Product[];
  loading: boolean;
  pagination: Pagination;
  selectedRowKeys: number[];
  columns: Array<ColumnData<Product>>;
  loadAll: () => LoadAllAction;
  changeTable: (changeData: TableChangeData) => ChangeTableAction;
  onSelectChange: (productIds: number[]) => ChangeSelectedRowKeysAction;
  goToUpdate: (productId: number) => RouterAction;
}

class Container extends React.Component<Props> {

  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    return <ProductTableWrapper { ...this.props } />
  }
}

const mapStateToProps = (state: State) => ({
  products: fromProduct.getProducts(state),
  loading: fromProduct.getProductsLoading(state),
  pagination: fromProduct.getProductPagination(state),
  selectedRowKeys: fromProduct.getProductSelectedRowKeys(state),
  columns: fromProduct.getProductColumns(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: () => dispatch(LoadAll()),
  changeTable: (changeData: TableChangeData) => dispatch(ChangeTable(changeData)),
  onSelectChange: (productIds: number[]) => dispatch(ChangeSelectedRowKeys(productIds)),
  goToUpdate: (productId: number) => dispatch(push(`/product/update/${productId}`)),
});

export const ProductTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
