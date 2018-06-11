import * as React from 'react';

import { Button, Checkbox, InputNumber, message, Select } from 'antd';

import {
  AddDealerPriceAction,
  RemoveDealerPriceAction,
  ResetSelectDealerAction,
  SelectDealerAction,
  ToggleHasDealerPriceAction,
  UpdateDealerOrderCostAction,
  UpdateDealerOrderPriceAction,
  UpdateDealerPriceAllowPurchaseAction,
} from '../../actions/product';
import { Dealer, DealerPrice, NumberablePayload, SelectDealerPayload } from '../../models';

import './index.css';

const Option = Select.Option;

interface Props {
  hasDealerPrice: boolean;
  priceList: DealerPrice[];
  dealers: Dealer[];
  toggleHasDealerPrice: () => ToggleHasDealerPriceAction;
  updateDealerAllowPurchase: (id: number) => UpdateDealerPriceAllowPurchaseAction;
  updateDealerPrice: (payload: NumberablePayload) => UpdateDealerOrderPriceAction;
  updateDealerCost: (payload: NumberablePayload) => UpdateDealerOrderCostAction;
  addDealerPrice: (index: number) => AddDealerPriceAction;
  removeDealerPrice: (id: number) => RemoveDealerPriceAction;
  selectDealer: (payload: SelectDealerPayload) => SelectDealerAction;
  resetDealer: (index: number) => ResetSelectDealerAction;
}

export const DealerPriceTable: React.SFC<Props> = ({
  hasDealerPrice,
  priceList,
  dealers,
  toggleHasDealerPrice,
  updateDealerAllowPurchase,
  updateDealerCost,
  updateDealerPrice,
  addDealerPrice,
  removeDealerPrice,
  selectDealer,
  resetDealer,
}) => {

  const handleAllowPurchaseChange = (id: number): void => {
    updateDealerAllowPurchase(id);
  };

  const handlePriceChange = (id: number, value: number): void => {
    updateDealerPrice({
      id,
      value,
    });
  };

  const handleCostChange = (id: number, value: number): void => {
    updateDealerCost({
      id,
      value,
    });
  };

  const handleDealerChange = (index: number, id: string): void => {
    const selectedDealer = dealers.find(dealer => dealer.tenantId === +id);
    if (typeof selectedDealer !== 'undefined') {
      if (!!priceList.filter(dealerPrice => dealerPrice.tenantId === selectedDealer.tenantId).length) {
        message.error(`经销商${selectedDealer.tenantName}已经选过了`);
        resetDealer(index);
        return;
      }
      selectDealer({
        index,
        selectedDealer,
      });
    }
  }

  return (
    <>
      <div className="table-title">
        <Checkbox
          defaultChecked={ hasDealerPrice }
          onChange={ toggleHasDealerPrice }
        />
        <span>按经销商级别定价</span>
      </div>
      <div className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">
        <div className="ant-table-body">
          <table>
            <colgroup>
              <col width="120" />
              <col width="200" />
              <col />
              <col width="120" />
              <col width="200" />
              <col width="200" />
            </colgroup>
            <thead className="ant-table-thead">
              <tr>
                <th />
                <th>经销商名称</th>
                <th>经销商级别</th>
                <th>是否允许订货</th>
                <th>订货价</th>
                <th>起订量</th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              { priceList.map((dealerPrice: DealerPrice, index: number) => 
                <tr key={ dealerPrice.tenantId }>
                  <td>
                    <Button shape="circle" icon="plus" onClick={ addDealerPrice.bind(null, index) } />
                    { index >0 && <Button shape="circle" icon="minus" onClick={ removeDealerPrice.bind(null, dealerPrice.tenantId) } /> }
                  </td>
                  <td>
                    <Select onChange={ handleDealerChange.bind(null, index) } defaultValue={ dealerPrice.name }>
                      { dealers.map(dealer =>
                        <Option key={ dealer.tenantId } value={ dealer.tenantId }>{ dealer.tenantName }</Option>
                      ) }
                    </Select>
                  </td>
                  <td>{ dealerPrice.levelName }</td>
                  <td>
                    <Checkbox
                      checked={ dealerPrice.isAllowPurchase }
                      onChange={ handleAllowPurchaseChange.bind(null, dealerPrice.tenantId) }
                    />
                  </td>
                  <td>
                    <InputNumber
                      style={{ width: '100%' }}
                      value={ dealerPrice.orderPrice }
                      min={ 0 }
                      max={ 10000000 }
                      precision={ 2 }
                      onChange={ handlePriceChange.bind(null, dealerPrice.tenantId) }
                    />
                  </td>
                  <td>
                    <InputNumber
                      style={{ width: '100%' }}
                      value={ dealerPrice.orderCount }
                      min={ 0 }
                      max={ 10000000 }
                      onChange={ handleCostChange.bind(null, dealerPrice.tenantId) }
                    />
                  </td>
                </tr>
              ) }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}