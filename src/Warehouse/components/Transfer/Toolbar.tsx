import * as React from 'react';
import { push } from 'react-router-redux'

import {
   Button 
  , Checkbox
  , Form 
  , Input  } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { MTqueryToolbar } from "@app/shared/components";
import {getRenamedSelectors} from "@app/shared/utils";
import { store } from 'index'

import {toolbarLableCol} from "@app/shared/constants";

interface Props extends FormComponentProps{
  warehouses:any[],
  transferStatus:any[],
  onSubmit:(values:object) => void;
  onChange:(changedValues:object,allValues:object) => void;
}

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class InventoryToolbarForm extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  onCheckAllStockOutWarehouse  = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        stockOutWarehouseIds:this.props.warehouses.map(o => o.id)
      })
    } else {
      this.props.form.setFieldsValue({
        stockOutWarehouseIds:[]
      })
    }
  }

  onCheckAllStockInWarehouse  = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        stockInWarehouseIds:this.props.warehouses.map(o => o.id)
      })
    } else {
      this.props.form.setFieldsValue({
        stockInWarehouseIds:[]
      })
    }
  }

  onCheckAllTransferStatus = (e:any) => {
    if(e.target.checked){
      this.props.form.setFieldsValue({
        transferStatus:this.props.transferStatus.map(o => o.sysCode)
      })
    } else {
      this.props.form.setFieldsValue({
        transferStatus:[]
      })
    }
  }

  onGoToCreate =() => {
    store.dispatch(push('/warehouse/createTransfer'));
    
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
                        {getFieldDecorator('queryKey',{
                          initialValue: '',
                        })(
                          <Input style = {{width:'250px'}} placeholder="商品名称/编码/规格/条形码"/>
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
        <FormItem label = "调入仓:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllStockOutWarehouse} >全部</Checkbox>
          {getFieldDecorator('stockOutWarehouseIds',{
            initialValue: [],
          })(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.warehouses,'warehouseName','id') } />
          )}
        </FormItem>

        <FormItem label = "调出仓:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllStockInWarehouse} >全部</Checkbox>
          {getFieldDecorator('stockInWarehouseIds',{
            initialValue: [],
          })(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.warehouses,'warehouseName','id') } />
          )}
        </FormItem>

        <FormItem label = "调拨状态:" labelCol = {toolbarLableCol}>
          <Checkbox  onChange = {this.onCheckAllTransferStatus} >全部</Checkbox>
          {getFieldDecorator('transferStatus',{
            initialValue: [],
          })(
            <CheckboxGroup key="value" options={getRenamedSelectors(this.props.transferStatus,'sysName','sysCode') } />
          )}
        </FormItem>
    </>

    return (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <MTqueryToolbar
          title='库存调拨'
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

export const WrappedInOutToolbarForm = Form.create({
  onValuesChange
})(InventoryToolbarForm);