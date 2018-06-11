import * as React from 'react';

import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { formItemLayout } from '@app/shared/constants';
import { Warehouse } from '../../models';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface WarehouseFormProps extends FormComponentProps {
  wrappedComponentRef: any;
  warehouse?: Warehouse;
}

class WarehouseForm extends React.Component<WarehouseFormProps> {

  render() {
    const { getFieldDecorator } = this.props.form;
    const { warehouse } = this.props;

    return (
      <Form>
        <FormItem
          { ...formItemLayout }
          label="仓库名称"
        >
          { getFieldDecorator('warehouseName', {
            initialValue: warehouse ? warehouse.warehouseName : '',
            rules: [{
              required: true, message: '请输入仓库名称',
            }],
          })(
            <Input />
          ) }
        </FormItem>
        <FormItem
          { ...formItemLayout }
          label="仓库编号"
        >
          { getFieldDecorator('warehouseNO', {
            initialValue: warehouse ? warehouse.warehouseNO : '',
            rules: [{
              required: true, message: '请输入仓库编号',
            }],
          })(
            <Input />
          ) }
        </FormItem>
        <FormItem
          { ...formItemLayout }
          label="仓库地址"
        >
          { getFieldDecorator('warehouseLocation', {
            initialValue: warehouse ? warehouse.warehouseLocation : '',
          })(
            <TextArea rows={ 4 } />
          ) }
        </FormItem>
      </Form>
    );
  }
}

export const WrappedWarehouseForm = Form.create()(WarehouseForm);