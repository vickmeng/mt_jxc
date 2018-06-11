import * as React from 'react';

import { Checkbox, InputNumber } from 'antd';

import { convertFromDiscount } from '@app/shared/utils';
import {
  UpdateDealerLevelOrderCostAction,
  UpdateDealerLevelOrderPriceAction,
  UpdateDealerLevelPriceAllowPurchaseAction,
} from '../../actions/product';
import { DealerLevelPrice, NumberablePayload } from '../../models';

import './index.css';

interface Props {
  priceList: DealerLevelPrice[];
  updateDealerLevelAllowPurchase: (id: number) => UpdateDealerLevelPriceAllowPurchaseAction;
  updateDealerLevelPrice: (payload: NumberablePayload) => UpdateDealerLevelOrderPriceAction;
  updateDealerLevelCost: (payload: NumberablePayload) => UpdateDealerLevelOrderCostAction;
}

export const DealerLevelPriceTable: React.SFC<Props> = ({
  priceList,
  updateDealerLevelAllowPurchase,
  updateDealerLevelPrice,
  updateDealerLevelCost,
}) => {

  const handleAllowPurchaseChange = (id: number): void => {
    updateDealerLevelAllowPurchase(id);
  };

  const handlePriceChange = (id: number, value: number): void => {
    updateDealerLevelPrice({
      id,
      value,
    });
  };

  const handleCostChange = (id: number, value: number): void => {
    updateDealerLevelCost({
      id,
      value,
    });
  };

  return (
    <>
      <div className="table-title">
        <Checkbox defaultChecked disabled={ true } />
        <span>按经销商级别定价</span>
      </div>
      <div className="ant-table ant-table-large ant-table-bordered ant-table-scroll-position-left">
        <div className="ant-table-body">
          <table>
            <colgroup>
              <col />
              <col width="150" />
              <col width="150" />
              <col width="200" />
              <col width="200" />
            </colgroup>
            <thead className="ant-table-thead">
              <tr>
                <th>经销商级别</th>
                <th>默认折扣</th>
                <th>是否允许订货</th>
                <th>订货价</th>
                <th>起订量</th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              { priceList.map((dealerLevelPrice: DealerLevelPrice) => 
                <tr key={ dealerLevelPrice.tenantLevelId }>
                  <td>{ dealerLevelPrice.name }</td>
                  <td>{ convertFromDiscount(dealerLevelPrice.discount) }%</td>
                  <td>
                    <Checkbox
                      checked={ dealerLevelPrice.isAllowPurchase }
                      onChange={ handleAllowPurchaseChange.bind(null, dealerLevelPrice.tenantLevelId) }
                    />
                  </td>
                  <td>
                    <InputNumber
                      style={{ width: '100%' }}
                      value={ dealerLevelPrice.orderPrice }
                      min={ 0 }
                      max={ 10000000 }
                      precision={ 2 }
                      onChange={ handlePriceChange.bind(null, dealerLevelPrice.tenantLevelId) }
                    />
                  </td>
                  <td>
                    <InputNumber
                      style={{ width: '100%' }}
                      value={ dealerLevelPrice.orderCount }
                      min={ 0 }
                      max={ 10000000 }
                      onChange={ handleCostChange.bind(null, dealerLevelPrice.tenantLevelId) }
                    />
                  </td>
                </tr>
              ) }
            </tbody>
          </table>
        </div>
      </div>
  </>
  );
};