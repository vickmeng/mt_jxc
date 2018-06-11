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
  Sort,
  SortAction,
} from '../../actions/dealerLevel';
import { DealerLevel, DealerLevelSortParams } from '../../models';
import * as fromSetting from '../../reducers';
import { DealerLevelTableWrapper } from './Table';

interface Props {
  dealerLevels: DealerLevel[];
  loading: boolean;
  loadAll: () => LoadAllAction;
  openUpdateModal: (dealerLevel: DealerLevel) => OpenUpdateModalAction;
  deleteById: (dealerLevelId: number) => DeleteAction;
  sort: (sortParams: DealerLevelSortParams) => SortAction;
}

class Container extends React.Component<Props> {

  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    return <DealerLevelTableWrapper { ...this.props } />;
  }
}

const mapStateToProps = (state: State) => ({
  dealerLevels: fromSetting.getDealerLevels(state),
  loading: fromSetting.getDealerLevelLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: () => dispatch(LoadAll()),
  openUpdateModal: (dealerLevel: DealerLevel) => dispatch(OpenUpdateModal(dealerLevel)),
  deleteById: (dealerLevelId: number) => dispatch(Delete(dealerLevelId)),
  sort: (sortParams: DealerLevelSortParams) => dispatch(Sort(sortParams)),
});

export const DealerLevelsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);


