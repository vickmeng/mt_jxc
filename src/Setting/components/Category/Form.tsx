import * as React from 'react';

import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { formItemLayout } from '@app/shared/constants';
import { Category } from '../../models';

const FormItem = Form.Item;

interface CategoryFormProps extends FormComponentProps {
  wrappedComponentRef: any;
  category?: Category;
}

class CategoryForm extends React.Component<CategoryFormProps> {

  render() {
    const { getFieldDecorator } = this.props.form;
    const { category } = this.props;

    return (
      <Form>
        <FormItem
          { ...formItemLayout }
          label="分类名称"
        >
          { getFieldDecorator('productCategoryName', {
            initialValue: category ? category.productCategoryName : '',
            rules: [{
              required: true, message: '请输入分类名称',
            }],
          })(
            <Input />
          ) }
        </FormItem>
      </Form>
    );
  }
}

export const WrappedCategoryForm = Form.create()(CategoryForm);