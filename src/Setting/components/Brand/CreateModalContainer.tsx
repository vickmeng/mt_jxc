import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseCreateModal,
  Create,
} from '../../actions/brand';
import { BrandEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { CreateModal } from './CreateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getBrandCreateModalVisible(state),
  confirmLoading: fromSetting.getBrandCreateModalConfirmLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseCreateModal()),
  create: (brand: BrandEntity) => dispatch(Create(brand)),
});

export const BrandCreateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateModal);
