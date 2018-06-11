import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseCreateModal,
  Create,
} from '../../actions/warehouse';
import { WarehouseEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { CreateModal } from './CreateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getWarehouseCreateModalVisible(state),
  confirmLoading: fromSetting.getWarehouseCreateModalConfirmLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseCreateModal()),
  create: (warehouse: WarehouseEntity) => dispatch(Create(warehouse)),
});

export const WarehouseCreateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateModal);
