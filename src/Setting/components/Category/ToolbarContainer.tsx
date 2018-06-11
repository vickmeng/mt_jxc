import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  BatchDelete,
  OpenCreateModal,
} from '../../actions/category';
import * as fromSetting from '../../reducers';
import { Toolbar } from './Toolbar';

const mapStateToProps = (state: State) => ({
  selectedRowKeys: fromSetting.getCategorySelectedRowKeys(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openCreateModal: () => dispatch(OpenCreateModal()),
  batchDelete: (categoryIds: number[]) => dispatch(BatchDelete(categoryIds)),
});

export const CategoryToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toolbar);