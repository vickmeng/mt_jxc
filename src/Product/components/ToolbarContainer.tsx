import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import { ColumnData } from '@app/shared/models';
import {
  BatchDelete,
  BatchSetStatus,
  ChangeTableColumn,
  OpenOnShelfModal,
} from '../actions/product';
import { OnShelfParams, Product } from '../models';
import * as fromProduct from '../reducers';
import { Toolbar } from './Toolbar';

const mapStateToProps = (state: State) => ({
  columns: fromProduct.getProductColumns(state),
  selectedRowKeys: fromProduct.getProductSelectedRowKeys(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeTableColumn: (columns: Array<ColumnData<Product>>) => dispatch(ChangeTableColumn(columns)),
  openOnShelfModal: () => dispatch(OpenOnShelfModal()),
  batchSetOffShelf: (params: OnShelfParams) => dispatch(BatchSetStatus(params)),
  batchDelete: (productIds: number[]) => dispatch(BatchDelete(productIds)),
  goToCreate: () => dispatch(push('/product/create')),
});

export const ProductToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toolbar);