import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  OpenCreateModal,
} from '../../actions/brand';
import { Toolbar } from './Toolbar';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openCreateModal: () => dispatch(OpenCreateModal()),
});

export const BrandToolbarContainer = connect(
  null,
  mapDispatchToProps,
)(Toolbar);
