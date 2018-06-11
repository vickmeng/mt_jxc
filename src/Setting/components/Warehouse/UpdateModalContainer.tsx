import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseUpdateModal,
  Update,
} from '../../actions/warehouse';
import { Warehouse } from '../../models';
import * as fromSetting from '../../reducers';
import { UpdateModal } from './UpdateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getWarehouseUpdateModalVisible(state),
  confirmLoading: fromSetting.getWarehouseUpdateModalConfirmLoading(state),
  editedWarehouse: fromSetting.getWarehouseUpdateModalEditedEntity(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseUpdateModal()),
  update: (warehouse: Warehouse) => dispatch(Update(warehouse)),
});

export const WarehouseUpdateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateModal);
