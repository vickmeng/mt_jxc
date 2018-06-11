import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseUpdateModal,
  Update,
} from '../../actions/unit';
import { UnitEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { UpdateModal } from './UpdateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getUnitUpdateModalVisible(state),
  confirmLoading: fromSetting.getUnitUpdateModalConfirmLoading(state),
  editedUnit: fromSetting.getUnitUpdateModalEditedEntity(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseUpdateModal()),
  update: (unit: UnitEntity) => dispatch(Update(unit)),
});

export const UnitUpdateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateModal);
