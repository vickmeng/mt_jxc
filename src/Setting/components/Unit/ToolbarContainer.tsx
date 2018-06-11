import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  OpenCreateModal,
} from '../../actions/unit';
import { Toolbar } from './Toolbar';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openCreateModal: () => dispatch(OpenCreateModal()),
});

export const UnitToolbarContainer = connect(
  null,
  mapDispatchToProps,
)(Toolbar);
