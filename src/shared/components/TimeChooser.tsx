/**
 * 维康
 */

import * as moment from 'moment';
import * as React from 'react';

import { Button, DatePicker, message, Modal } from 'antd';

const { RangePicker } = DatePicker;

interface BaseProps {
  onChange?:(e:any) => void;
  outsideTime?:string; // XXX接受外部的快捷选择，若有值则切换为‘其他时间’文案的按钮
  text?:string;
}
const onChange    = () => {return};
const outsideTime = "";
const text        = "其它时间";

class TimeChooser extends React.Component<BaseProps>{
  static defaultProps = {
    onChange
    ,outsideTime
    ,text
  };
  bodyStyle:any = {'textAlign':'center'};
  buttonInnerText = '';
  dialog:any;
  pickerValue:any[] = [undefined,undefined];
  state = {
    visible:false,
  }
  
  constructor(props:any){
    super(props);
  }

  getDefaultValue = (): [moment.Moment,moment.Moment] | undefined[] => {
    return this.hasPickedTime()
            ? [moment(this.pickerValue[0],'YYYY-MM-DD'), moment(this.pickerValue[1],'YYYY-MM-DD')]
            : [undefined,undefined]
  }

  getDisabledDate = (current:any) => {
    return current && current > moment().endOf('day');
  }

  hasPickedTime = ():boolean =>  Boolean(this.buttonInnerText && !this.props.outsideTime);

  handleToggleDialog = (visible:boolean) => {
    this.setState({visible});
  }
  
  handleValidata = ():boolean => {
    return Boolean(this.pickerValue[0] && this.pickerValue[1]);
  }

  onCancel = () => {
    this.handleToggleDialog(false);
  }

  onOk = () => {
    if(this.handleValidata()){
      this.buttonInnerText =  this.pickerValue[0] + '~' + this.pickerValue[1];
      (this.props.onChange as any)(this.pickerValue);
      this.handleToggleDialog(false);
    }else{
      message.error('时间不可为空！');
    }
  }
  /*tslint:disable:variable-name*/
  onChange = (_date:any, dateString:any) => {
    this.pickerValue = dateString;
  }

  onOpenDialog = () => {
    this.pickerValue = [undefined,undefined];// 手动清空pickValue
    this.handleToggleDialog(true);
  }
  onOpenDialogOwnPickerValue = () => {
    this.handleToggleDialog(true);
  }

  templeteButton = () => {
    return this.hasPickedTime()
            ? <Button type="primary" onClick = {this.onOpenDialogOwnPickerValue}>{ this.buttonInnerText }</Button> 
            : <Button onClick = {this.onOpenDialog}>{this.props.text}</Button>;
  }

  render() {
    const $button = this.templeteButton();
    return (
      <>
        {$button}
        <Modal
          title = {this.props.text}
          visible = {this.state.visible}
          onOk = {this.onOk}
          onCancel = {this.onCancel}
          okText = "确认"
          cancelText = "取消"
          bodyStyle = {this.bodyStyle}
          destroyOnClose = {true}
        > 
          选择时间 &nbsp;&nbsp;
          <RangePicker
            defaultValue = { this.getDefaultValue()}
            disabledDate = {this.getDisabledDate}
            onChange = {this.onChange} 
            allowClear = {false}
          />
        </Modal>
      </>
    );
  }
}

export default TimeChooser;