import * as React from 'react';

import { Card, Col, Form, InputNumber, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import {
  LoadAllAction as LoadDealerLevelsAction,
} from '@app/Setting/actions/dealerLevel';
import { formItemLayout } from '@app/shared/constants';
import {
  AddDealerPriceAction,
  LoadAllDealerAction,
  RemoveDealerPriceAction,
  ResetSelectDealerAction,
  SelectDealerAction,
  ToggleHasDealerPriceAction,
  UpdateDealerLevelOrderCostAction,
  UpdateDealerLevelOrderPriceAction,
  UpdateDealerLevelPriceAllowPurchaseAction,
  UpdateDealerOrderCostAction,
  UpdateDealerOrderPriceAction,
  UpdateDealerPriceAllowPurchaseAction,
  UpdatePriceAction,
} from '../../actions/product';
import {
  Dealer,
  DealerLevelPrice,
  DealerPrice,
  NumberablePayload,
  ProductFormValues,
  SelectDealerPayload,
} from '../../models';
import { DealerLevelPriceTable } from './DealerLevelPriceTable';
import { DealerPriceTable } from './DealerPriceTable';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  dealerLevelPriceList: DealerLevelPrice[];
  hasDealerPrice: boolean;
  dealerPriceList: DealerPrice[];
  dealers: Dealer[];
  product?: ProductFormValues;
  updatePrice: (price: number) => UpdatePriceAction;
  loadDealerLevles: () => LoadDealerLevelsAction;
  updateDealerLevelAllowPurchase: (id: number) => UpdateDealerLevelPriceAllowPurchaseAction;
  updateDealerLevelPrice: (payload: NumberablePayload) => UpdateDealerLevelOrderPriceAction;
  updateDealerLevelCost: (payload: NumberablePayload) => UpdateDealerLevelOrderCostAction;
  toggleHasDealerPrice: () => ToggleHasDealerPriceAction;
  loadDealers: () => LoadAllDealerAction;
  updateDealerAllowPurchase: (id: number) => UpdateDealerPriceAllowPurchaseAction;
  updateDealerPrice: (payload: NumberablePayload) => UpdateDealerOrderPriceAction;
  updateDealerCost: (payload: NumberablePayload) => UpdateDealerOrderCostAction;
  addDealerPrice: (index: number) => AddDealerPriceAction;
  removeDealerPrice: (id: number) => RemoveDealerPriceAction;
  selectDealer: (payload: SelectDealerPayload) => SelectDealerAction;
  resetDealer: (index: number) => ResetSelectDealerAction;
}

export class PriceSetting extends React.Component<Props> {

  componentDidMount() {
    this.props.loadDealerLevles();
    this.props.loadDealers();
  }

  render() {
    const {
      dealerLevelPriceList,
      dealerPriceList,
      form,
      product,
      updatePrice,
    } = this.props;
    const { getFieldDecorator } = form;
  
    const handlePriceChange = (price: number): void => {
      updatePrice(price);
    };

    return (
      <Card title="价格设置">
        <Row>
          <Col span={ 9 }>
            <FormItem
              { ...formItemLayout }
              label="市场价"
            >
              { getFieldDecorator('price', {
                initialValue: product ? product.price : 0,
                rules: [{
                  required: true, message: '请输入市场价',
                }],
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  min={ 0 }
                  max={ 10000000 }
                  precision={ 2 }
                  onChange={ handlePriceChange }
                />
              ) }
            </FormItem>
          </Col>
          <Col span={ 9 } offset={ 2 }>
            <FormItem
              { ...formItemLayout }
              label="成本价"
            >
              { getFieldDecorator('cost', {
                initialValue: product ? product.cost : 0,
                rules: [{
                  required: true, message: '请输入成本价',
                }],
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  min={ 0 }
                  max={ 10000000 }
                  precision={ 2 }
                />
              ) }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <DealerLevelPriceTable
            priceList={ dealerLevelPriceList }
            { ...this.props }
          />
          <br />
          <DealerPriceTable
            priceList={ dealerPriceList }
            { ...this.props }
          />
        </Row>
      </Card>
    );
  }
};

