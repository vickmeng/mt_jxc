import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Col, Row } from 'antd';

import { State } from '@app/root';
import {
  Load,
  LoadAction,
  Update,
  UpdateAction,
} from '../../actions/dealer';
import { Dealer } from '../../models';
import * as fromSetting from '../../reducers';
import * as fromDealer from '../../reducers/dealer/detail';
import { WrappedDealerForm } from './Form';

interface Props {
  dealer: fromDealer.State;
  load: () => LoadAction;
  update: (dealer: Dealer) => UpdateAction;
}

class Container extends React.Component<Props> {

  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <Row>
        <Col span={ 12 }>
          <WrappedDealerForm { ...this.props } />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: State) => ({
  dealer: fromSetting.getDealerDeatilState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  load: () => dispatch(Load()),
  update: (dealer: Dealer) => dispatch(Update(dealer)),
});

export const DealerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);


