import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseCreateModal,
  Create,
} from '../../actions/dealerLevel';
import { DealerLevelEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { CreateModal } from './CreateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getDealerLevelCreateModalVisible(state),
  confirmLoading: fromSetting.getDealerLevelCreateModalConfirmLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseCreateModal()),
  create: (dealerLevel: DealerLevelEntity) => dispatch(Create(dealerLevel)),
});

export const DealerLevelCreateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateModal);
