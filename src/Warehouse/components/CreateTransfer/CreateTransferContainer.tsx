import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import * as utils from 'shared/utils';


import { Card,Icon,message } from 'antd';

import {
  SetStockCode,
  SetStockCodeAction,
  SetWarehouses,
  SetWarehousesAction,
} from '../../actions/common';

import {
  CreateTransfer,
  CreateTransferAction,
} from '../../actions/createTransfer';

import { State } from '@app/root';
import * as fromWarehouse from '../../reducers';

import {CreateTransferParams,ProductVos} from '../../models';

import {FormValueProps, WrappedCreateTransferForm} from './Form';

import {EditableInventoryTableColumnProps as ColumnProps} from '../../models'

interface Props {
  Warehouses:any[];
  setWarehouses:() => SetWarehousesAction;
  Saving:boolean;
  create:(params:CreateTransferParams) => CreateTransferAction;
  StockCode:string;
  setStockCode:() => SetStockCodeAction;
}


class Container extends React.Component<Props> {

  componentWillMount(){
    this.props.setWarehouses()
    this.props.setStockCode()
  }

  handlevalidate = (arr:ColumnProps[]):boolean => {
    if(!arr.length || arr.filter(o => !o.productId ).length){
      return false;
    }
    return true;
  }

  onSubmit = (formData:FormValueProps,tableData:ColumnProps[]):void => {
    if(this.handlevalidate(tableData)){
      const productVos:ProductVos[] = tableData.map(o => ({
        productId:o.productId,
        stockCount:o.stockCount,
        productRemark:o.productRemark
      }))
  
      const createParams:CreateTransferParams = {
        productVos,
        ...formData,
      }
      this.props.create(createParams);
    }else {
      message.warning('请正确添加商品');
    }
  }

  

  render() {
    const $title = <> 新增调拨<a href="javascript:;" onClick={utils.goBack}> <Icon type="left" /> 回到上级 </a> </>
    
    return <>
      <Card title={$title} bordered={false}>
        <WrappedCreateTransferForm
          initialStockCode = {this.props.StockCode}
          Saving={this.props.Saving}
          onSubmit={this.onSubmit}
          Warehouses = {this.props.Warehouses}
        />
      </Card>
    </>
  }
}

const mapStateToProps = (state: State) => ({
  StockCode  : fromWarehouse.getCommonStockCode(state),
  Warehouses : fromWarehouse.getCommonWarehouses(state),
  Saving     : fromWarehouse.getCreateTransferSaving(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setStockCode:() => dispatch(SetStockCode()),
  setWarehouses:() => dispatch(SetWarehouses()),
  create:(params:CreateTransferParams) => dispatch(CreateTransfer(params))
});

export const CreateTransferContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
