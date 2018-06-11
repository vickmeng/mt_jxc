import * as React from 'react';

import { Card } from 'antd';

import {MTtimeToolbar} from 'shared/components'

import {TimePickerValueType} from 'shared/models'


interface Props {
  onChange:(e:any) => void;
  defaultTime:TimePickerValueType
}

export class TimeToolbar extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Card bordered={false}>
        统计时间：
        <MTtimeToolbar 
          onChange = {this.props.onChange}
          value = {this.props.defaultTime}
        />
      </Card>
    )
  }
};