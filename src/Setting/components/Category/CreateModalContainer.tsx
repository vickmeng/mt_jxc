import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  CloseCreateModal,
  Create,
} from '../../actions/category';
import { CategoryEntity } from '../../models';
import * as fromSetting from '../../reducers';
import { CreateModal } from './CreateModal';

const mapStateToProps = (state: State) => ({
  visible: fromSetting.getCategoryCreateModalVisible(state),
  confirmLoading: fromSetting.getCategoryCreateModalConfirmLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(CloseCreateModal()),
  create: (category: CategoryEntity) => dispatch(Create(category)),
});

export const CategoryCreateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateModal);

