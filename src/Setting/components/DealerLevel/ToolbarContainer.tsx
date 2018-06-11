import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  OpenCreateModal,
} from '../../actions/dealerLevel';
import { Toolbar } from './Toolbar';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openCreateModal: () => dispatch(OpenCreateModal()),
});

export const DealerLevelToolbarContainer = connect(
  null,
  mapDispatchToProps,
)(Toolbar);
