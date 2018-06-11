import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseUpdateModal,
  Update,
} from '../../actions/dealerLevel';
import { DealerLevelEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { UpdateModal } from './UpdateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getDealerLevelUpdateModalVisible(state),
  confirmLoading: fromSetting.getDealerLevelUpdateModalConfirmLoading(state),
  editedDealerLevel: fromSetting.getDealerLevelUpdateModalEditedEntity(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseUpdateModal()),
  update: (dealerLevel: DealerLevelEntity) => dispatch(Update(dealerLevel)),
});

export const DealerLevelUpdateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateModal);
