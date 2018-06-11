import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseUpdateModal,
  Update,
} from '../../actions/brand';
import { BrandEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { UpdateModal } from './UpdateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getBrandUpdateModalVisible(state),
  confirmLoading: fromSetting.getBrandUpdateModalConfirmLoading(state),
  editedBrand: fromSetting.getBrandUpdateModalEditedEntity(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseUpdateModal()),
  update: (brand: BrandEntity) => dispatch(Update(brand)),
});

export const BrandUpdateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateModal);
