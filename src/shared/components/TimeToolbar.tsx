/**
 * vk
 */
import * as React from 'react';

import { Radio } from 'antd';
import TimeChooser from './TimeChooser';

import { TimePickerItem,TimePickerOutput,TimePickerValueType} from 'shared/models'
import {getTimeToolbarPicked} from 'shared/utils'

interface BaseProps {
  onChange?:(e:TimePickerOutput) => void;
  value?:TimePickerValueType;
  timePickers?:TimePickerItem[];
}

const onChange = ():void => {return};

const value = 'thismouth';

const timePickers:TimePickerItem[] = [
  {label:'今日',value:'today'},
  {label:'昨日',value:'yesterday'},
  {label:'本月',value:'thismouth'},
  {label:'上月',value:'lastmouth'},
];

class TimeToolbar extends React.Component<BaseProps>{
  static defaultProps = {
    onChange
    ,value
    ,timePickers
  };
  
  state = {value:this.props.value};
  
  constructor(props:any){
    super(props);
  }

  onChange = (e:any) => {
    this.setState({
      value:e.target.value
      ,otherTimeText:''});
    this.triggetChangeTime(getTimeToolbarPicked(e.target.value));
  }

  onChoose = (picker:any ) => {
    this.setState({value:''});
    this.triggetChangeTime(getTimeToolbarPicked(picker));
  }

  templeteButtons = () => {
    return (this.props.timePickers as TimePickerItem[]).map(o => 
      <Radio.Button key={o.value} value={o.value}>{o.label}</Radio.Button>
    )

  }

  triggetChangeTime = (picker:any) => {
    (this.props.onChange as any)(picker)
  }

  render() {
    const $templeteButtons = this.templeteButtons();
    return (
      <>
        <Radio.Group 
          onChange = {this.onChange}
          value = {this.state.value}>
          {$templeteButtons}
        </Radio.Group>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TimeChooser onChange = {this.onChoose} outsideTime = {this.state.value}/>
      </>
    );
  }
}

export default TimeToolbar;