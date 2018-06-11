import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseCreateModal,
  Create,
} from '../../actions/unit';
import { UnitEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { CreateModal } from './CreateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getUnitCreateModalVisible(state),
  confirmLoading: fromSetting.getUnitCreateModalConfirmLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseCreateModal()),
  create: (unit: UnitEntity) => dispatch(Create(unit)),
});

export const UnitCreateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateModal);
