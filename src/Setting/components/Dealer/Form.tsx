import * as React from 'react';

import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { formItemLayout, tailFormItemLayout } from '@app/shared/constants';
import { UpdateAction } from '../../actions/dealer';
import { Dealer } from '../../models';
import * as fromDealer from '../../reducers/dealer/detail';

interface DealerFormProps extends FormComponentProps {
  dealer: fromDealer.State;
  update: (dealer: Dealer) => UpdateAction;
}

const FormItem = Form.Item;

class DealerForm extends React.Component<DealerFormProps> {

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: Dealer) => {
      if (!err) {
        this.props.update(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dealer } = this.props;

    return (
      <Form onSubmit={ this.handleSubmit }>
        <FormItem
          { ...formItemLayout }
          label="订货方名称"
          extra="订货伙伴的统一称谓，如经销商、代理商、加盟店，最长4个字符"
        >
          { getFieldDecorator('tenantName', {
            initialValue: dealer.name,
            rules: [{
              required: true, message: '请输入订货方名称',
            }, {
              max: 4, message: '名称最长为4个字符',
            }],
          })(
            <Input />
          ) }
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: 200 }}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

export const WrappedDealerForm = Form.create()(DealerForm);