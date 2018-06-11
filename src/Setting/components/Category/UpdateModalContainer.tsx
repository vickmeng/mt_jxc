import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseUpdateModal,
  Update,
} from '../../actions/category';
import { CategoryEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { UpdateModal } from './UpdateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getCategoryUpdateModalVisible(state),
  confirmLoading: fromSetting.getCategoryUpdateModalConfirmLoading(state),
  editedCategory: fromSetting.getCategoryUpdateModalEditedEntity(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseUpdateModal()),
  update: (category: CategoryEntity) => dispatch(Update(category)),
});

export const CategoryUpdateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateModal);
