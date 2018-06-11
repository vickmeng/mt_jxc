import * as React from 'react';

import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { formItemLayout } from '@app/shared/constants';
import { Brand } from '../../models';

const FormItem = Form.Item;

interface BrandFormProps extends FormComponentProps {
  wrappedComponentRef: any;
  brand?: Brand;
}

class BrandForm extends React.Component<BrandFormProps> {

  render() {
    const { getFieldDecorator } = this.props.form;
    const { brand } = this.props;

    return (
      <Form>
        <FormItem
          { ...formItemLayout }
          label="品牌名称"
        >
          { getFieldDecorator('productBrandName', {
            initialValue: brand ? brand.productBrandName : '',
            rules: [{
              required: true, message: '请输入品牌名称',
            }],
          })(
            <Input />
          ) }
        </FormItem>
      </Form>
    );
  }
}

export const WrappedBrandForm = Form.create()(BrandForm);
