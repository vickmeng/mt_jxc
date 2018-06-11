import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  OpenCreateModal,
} from '../../actions/warehouse';
import { Toolbar } from './Toolbar';

const mapDispatchToProps = (dispatch:Dispatch) => ({
  openCreateModal: () => dispatch(OpenCreateModal()),
});

export const WarehouseToolbarContainer = connect(
  null,
  mapDispatchToProps,
)(Toolbar);

