import * as React from 'react';
import { push } from 'react-router-redux'

import {
   Button,
   Checkbox,
   Form,
   Input,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { MTqueryToolbar } from "shared/components";
import * as utils from 'shared/utils';

import { store } from 'index'

import {toolbarLableCol} from "@app/shared/constants";
import {
  isSaleMap,
  orderStatusMap,
  payStatusMap,
} from '../../constants'

interface Props extends FormComponentProps{
  onSubmit:(values:object) => void;
  onChange:(changedValues:object,allValues:object) => void;
}

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class ToolbarForm extends React.Component<Props> {
  orderStatusSelectors = utils.mapToSelectors(orderStatusMap);
  payStatusSelectors =  utils.mapToSelectors(payStatusMap);
  isSaleSelectors = utils.mapToSelectors(isSaleMap);

  constructor(props: Props) {
    super(props);
  }

  onCheckAllOrderStatus = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        orderStatus:this.orderStatusSelectors.map(o => o.value)
      })
    } else {
      this.props.form.setFieldsValue({
        orderStatus:[]
      })
    }
  }

  onCheckAllPayStatus = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        payStatus:this.payStatusSelectors.map(o => o.value)
      })
    } else {
      this.props.form.setFieldsValue({
        payStatus:[]
      })
    }
  }

  onCheckAllIsSale = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        isSale:this.isSaleSelectors.map(o => o.value)
      })
    } else {
      this.props.form.setFieldsValue({
        isSale:[]
      })
    }
  }

  onGoToCreate =() => {
    store.dispatch(push(''));
  }

  onSubmit = (e:React.FormEvent<Event>) => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:object) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator} = this.props.form;
    const $left = <Button type="primary" onClick={this.onGoToCreate}>新增</Button>

    const $right =  <div className="queryToolbarRightside">
                      <FormItem>
                        {getFieldDecorator('queryKey',{initialValue:''})(
                          <Input style = {{width:'250px'}} placeholder="订单号/经销商号"/>
                        )}
                      </FormItem>
                      <FormItem>
                        <Button
                          type="primary"
                          htmlType="submit"
                        >
                          搜索
                        </Button>
                      </FormItem>
                    </div>;

    const $content = <>
        <FormItem label = "订单状态:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllOrderStatus} >全部</Checkbox>
          {getFieldDecorator('orderStatus',{initialValue:[]})(
            <CheckboxGroup key="value" options={ this.orderStatusSelectors } />
          )}
        </FormItem>
        <FormItem label = "支付状态:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllPayStatus} >全部</Checkbox>
          {getFieldDecorator('payStatus',{initialValue:[]})(
            <CheckboxGroup key="value" options={ this.payStatusSelectors } />
          )}
        </FormItem>

        <FormItem label = "订单标签:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllIsSale} >全部</Checkbox>
          {getFieldDecorator('isSale',{initialValue:[]})(
            <CheckboxGroup key="value" options={ this.isSaleSelectors } />
          )}
        </FormItem>
    </>

    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <MTqueryToolbar
          title='订单'
          leftContent = {$left}
          rightContent = {$right}
        >
          {$content}
        </MTqueryToolbar>
      </Form>
    )
  }
};

function onValuesChange(props:any,changedValues:object,allValues:object){
  props.onChange(changedValues,allValues);
}

export const WrappedToolbarForm = Form.create({
  onValuesChange
})(ToolbarForm);