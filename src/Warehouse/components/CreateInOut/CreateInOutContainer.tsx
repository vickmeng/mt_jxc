import * as React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import * as utils from 'shared/utils';

import { Card,Icon,message } from 'antd';

import {
  SetStockCode,
  SetStockCodeAction,
  SetStockTypes,
  SetStockTypesAction,
  SetWarehouses,
  SetWarehousesAction,
} from '../../actions/common';

import {
  CreateInOut,
  CreateInOutAction,
} from '../../actions/createInOut';

import { State } from '@app/root';
import * as fromWarehouse from '../../reducers';

import {CreateInOutParams,ProductVos,stockKindType} from '../../models';

import {FormValueProps, WrappedCreateInOutForm} from './Form';

import {EditableInventoryTableColumnProps as ColumnProps} from '../../models'

interface Props {
  stockKind:stockKindType;

  StockTypes:any[];
  setStockTypes:() => SetStockTypesAction;

  Warehouses:any[];
  setWarehouses:() => SetWarehousesAction;

  Saving:boolean;
  create:(params:CreateInOutParams) => CreateInOutAction;

  StockCode:string;
  setStockCode:() => SetStockCodeAction;
}


class Container extends React.Component<Props> {

  componentWillMount(){
    this.props.setStockTypes();
    this.props.setWarehouses();
    this.props.setStockCode();
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
  
      const createParams:CreateInOutParams = {
        stockKind : this.props.stockKind,
        productVos,
        ...formData,
      }
      this.props.create(createParams);
    }else {
      message.warning('请正确添加商品');
    }
  }

  templeteTitle = () => {
    return <>
      {this.props.stockKind === 'S_CRK_RK' ? '新建入库' :"新建出库"}
      <a href="javascript:;" onClick={utils.goBack}> <Icon type="left" /> 回到上级 </a>
    </>
  }

  render() {
    
    return <>
      <Card title={this.templeteTitle()} bordered={false}>
        <WrappedCreateInOutForm
          initialStockCode = {this.props.StockCode}
          stockKind={this.props.stockKind}
          Saving={this.props.Saving}
          onSubmit={this.onSubmit}
          StockTypes = {this.props.StockTypes}
          Warehouses = {this.props.Warehouses}
        />
      </Card>
    </>
  }
}

const mapStateToProps = (state: State) => ({
  StockCode  : fromWarehouse.getCommonStockCode(state),
  StockTypes : fromWarehouse.getCommonStockTypes(state),
  Warehouses : fromWarehouse.getCommonWarehouses(state),
  Saving     : fromWarehouse.getCreateInOutSaving(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setStockCode:() => dispatch(SetStockCode()),
  setStockTypes:() => dispatch(SetStockTypes()),
  setWarehouses:() => dispatch(SetWarehouses()),
  create:(params:CreateInOutParams) => dispatch(CreateInOut(params))
});


export const CreateInOutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
