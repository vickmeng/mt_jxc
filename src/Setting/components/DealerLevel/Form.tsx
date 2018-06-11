import * as React from 'react';

import { Form, Icon, Input, Tooltip } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { formItemLayout } from '@app/shared/constants';
import { convertFromDiscount } from '@app/shared/utils';
import { DealerLevel } from '../../models';

const FormItem = Form.Item;

interface DealerLevelFormProps extends FormComponentProps {
  wrappedComponentRef: any;
  dealerLevel?: DealerLevel;
}

class DealerLevelForm extends React.Component<DealerLevelFormProps> {

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dealerLevel } = this.props;

    return (
      <Form>
        <FormItem
          { ...formItemLayout }
          label="级别名称"
        >
          { getFieldDecorator('tenantLevelName', {
            initialValue: dealerLevel ? dealerLevel.tenantLevelName : '',
            rules: [{
              required: true, message: '请输入经销商级别名称',
            }],
          })(
            <Input />
          ) }
        </FormItem>
        <FormItem
          { ...formItemLayout }
          label={ (
            <span>
              订货折扣&nbsp;
              <Tooltip title="修改折扣后会对整体定价进行调整">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          ) }
        >
          { getFieldDecorator('discount', {
            initialValue: dealerLevel ? convertFromDiscount(dealerLevel.discount) : '',
            rules: [{
              required: true, message: '请输入折扣',
            }, {
              pattern: /^100$|^(\d|[1-9]\d)$/, message: '请输入0-100的数字',
            }],
          })(
            <Input addonAfter={ <span>%</span> } />
          ) }
        </FormItem>
      </Form>
    );
  }
}

export const WrappedDealerLevelForm = Form.create()(DealerLevelForm);