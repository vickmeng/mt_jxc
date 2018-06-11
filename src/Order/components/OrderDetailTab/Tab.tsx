import * as React from 'react';

import { Tabs  } from 'antd';

import * as utils from 'shared/utils';

import {OrderDetailContainer} from '../OrderDetail';

const TabPane = Tabs.TabPane;

interface Props {
  id:string,
  initalkey?:string
}

export class OrderDetailTab extends React.Component<Props> {
  static defaultProps = {
    initalkey:'1'
  }

  state={
    key:this.props.initalkey
  }

  onChangeTab = (key:string) => {
    this.setState({key})
  }


  render() {
    const $extra =<a href="javascript:;" onClick={utils.goBack}>返回上级</a>

    return (
      <Tabs 
        size="large"
        activeKey={this.state.key}
        tabBarExtraContent={$extra}
        onChange={this.onChangeTab}
      >
        <TabPane tab="订单详情" key="1">
          <OrderDetailContainer id={this.props.id} ChangeTab={this.onChangeTab} />
        </TabPane>
        <TabPane tab="出库发货详情" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="收款记录" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    )
  }
};