import * as React from 'react';
import { connect } from 'react-redux';

import { go } from 'react-router-redux'
import { Dispatch } from 'redux';

import * as moment from 'moment';
import * as utils from 'shared/utils';

import { store } from 'index'

import { Card,Col, Icon, Row,Spin ,Table } from 'antd';

import { State } from '@app/root';

import {
  SetInOutDetail,
  SetInOutDetailAction
} from '../../actions/inOutDetail';

import {totalFlage} from 'shared/constants';
import * as fromWarehouse from '../../reducers';

import {InOutDetailParams,stockKindType} from '../../models';

interface Props {
  stockId:number,
  stockKind:stockKindType;
  loading:boolean;
  detailData:any;
  SetInOutDetail:(params: InOutDetailParams) => SetInOutDetailAction
}

class Container extends React.Component<Props> {
  /*tslint:disable:variable-name*/
  columns = [
    {
      title: ' ',
      dataIndex: 'index',
      render:(_t:string , r:any , i:number) => utils.colspanFormatter( r.index , 5 , i+1)
    },
    {
      title: '编码',
      dataIndex: 'productNO',
      render:(t:string,r:any,_i:number) => utils.colspanFormatter( r.index , 0 , t )
    },
    {
      title: '商品',
      dataIndex: 'productName',
      render:(t:string,r:any,_i:number) => utils.colspanFormatter( r.index , 0 , t)
    },
    {
      title: '规格',
      dataIndex: 'specification',
      render:(t:string,r:any,_i:number) => utils.colspanFormatter( r.index , 0 , t)

    },
    {
      title: '单位',
      dataIndex: 'productUnitName',
      render:(t:string,r:any,_i:number) => utils.colspanFormatter( r.index , 0, t)
    },
    {
      title: '入库数量',
      dataIndex: 'stockCount',
      render:(t:string,r:any,_i:number) => utils.colspanFormatter( r.index , 2 , t , t )

    },
    {
      title: '备注',
      dataIndex: 'productRemark',
      render:(t:string,r:any,_i:number) => utils.colspanFormatter( r.index , 0 , t )
    },
  ]

  componentWillMount(){
    this.props.SetInOutDetail({
      stockId:this.props.stockId
    })
  }

  onGoBack = () => {
    store.dispatch(go(-1));
  }

  templeteTitle = () => {
    return <>
      {this.props.stockKind === 'S_CRK_RK' ? '入库明细' :"出库明细"}
      <a href="javascript:;" onClick={this.onGoBack}> <Icon type="left" /> 回到上级 </a>
    </>
  }

  render() {
    const data:any = Object.assign({},this.props.detailData[0]) ;

    const productVos = data.productVos ? 
    [
      ...data.productVos,
      {index : totalFlage, stockCount:utils.sumByKey(data.productVos,'stockCount')}
    ] : [];

    productVos.forEach((o:any,i:number) => { o.index = o.index || i});

    return <>
      <Card title={this.templeteTitle()} bordered={false}>
        <Spin spinning ={this.props.loading}>

          <Row>
            <Col xl = {{span:6}} lg = {{span:12}}>
            仓库：{data.warehouseName}
            </Col>
            <Col xl = {{span:6}} lg = {{span:12}}>
            单号：{data.stockNO}
            </Col>
            <Col xl = {{span:6}} lg = {{span:12}}>
            入库时间: {moment(data.stockTime).format('YYYY/MM/DD hh:mm:ss') }
            </Col>
            <Col xl = {{span:6}} lg = {{span:12}}>
            制单人：
            </Col>
          </Row>

          <Table rowKey="index" bordered={false} pagination={false} dataSource={productVos} columns={this.columns} />
          <p>备注： {data.stockRemark}</p>
        </Spin>

      </Card>
    </>
  }
}

const mapStateToProps = (state: State) => ({
  loading:fromWarehouse.getInOutDetailLoading(state),
  detailData:fromWarehouse.getInOutDetailData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  SetInOutDetail : (params:InOutDetailParams) => dispatch(SetInOutDetail(params))
});

export const InOutDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
