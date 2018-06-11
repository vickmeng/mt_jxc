import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  Delete,
  DeleteAction,
  LoadAll,
  LoadAllAction,
  OpenUpdateModal,
  OpenUpdateModalAction,
} from '../../actions/unit';
import { Unit } from '../../models';
import * as fromSetting from '../../reducers';
import { UnitTableWrapper } from './Table';

interface Props {
  units: Unit[];
  loading: boolean;
  loadAll: () => LoadAllAction;
  openUpdateModal: (unit: Unit) => OpenUpdateModalAction;
  deleteById: (unitId: number) => DeleteAction;
}

class Container extends React.Component<Props> {

  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    return <UnitTableWrapper { ...this.props } />
  }
}

const mapStateToProps = (state: State) => ({
  units: fromSetting.getUnits(state),
  loading: fromSetting.getUnitLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: () => dispatch(LoadAll()),
  openUpdateModal: (unit: Unit) => dispatch(OpenUpdateModal(unit)),
  deleteById: (unitId: number) => dispatch(Delete(unitId)),
});

export const UnitTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
