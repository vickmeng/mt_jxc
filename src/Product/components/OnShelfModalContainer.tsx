import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  BatchSetStatus,
  CloseOnShelfModal,
} from '../actions/product';
import { OnShelfParams } from '../models';
import * as fromProduct from '../reducers';
import { OnShelfModal } from './OnShelfModal';

const mapStateToProps = (state: State) => ({
  visible: fromProduct.getOnShelfModalVisible(state),
  confirmLoading: fromProduct.getOnShelfModalConfirmLoading(state),
  selectedRowKeys: fromProduct.getProductSelectedRowKeys(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseOnShelfModal()),
  batchSetStatus: (params: OnShelfParams) => dispatch(BatchSetStatus(params)),
});

export const ProducrtOnShelfModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnShelfModal);