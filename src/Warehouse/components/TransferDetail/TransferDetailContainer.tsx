import * as React from 'react';
import { connect } from 'react-redux';

import { go } from 'react-router-redux'
import { Dispatch } from 'redux';

import * as moment from 'moment';

import { store } from 'index'

import {Button, Card, Col, Dropdown ,Icon,Menu,Row,Spin, Table} from 'antd';
import {ClickParam} from 'antd/lib/menu'

import * as utils from 'shared/utils';

import { State } from '@app/root';
import {totalFlage} from 'shared/constants';

import {
  SetTransferDetail,
  SetTransferDetailAction,
  SetTransferOperatelog,
  SetTransferOperatelogAction,
} from '../../actions/transferDetail';

import * as fromWarehouse from '../../reducers';

import {
  OpenModal as OpenModalIn,
  OpenModalAction as OpenModalActionIn,
} from '../../actions/stockInModal';

import {
  OpenModal as OpenModalCancel,
  OpenModalAction as OpenModalActionCancel,
} from '../../actions/stockCancelModal';

import {StockCancelModalParams, StockInModalParams,TransferDetailParams} from '../../models';

import {StockCancelModalContainer,StockInModalContainer} from '../../components/Common';


interface Props {
  id:number;
  OpenModalIn:(param:StockInModalParams) => OpenModalActionIn
  OpenModalCancel:(param:StockCancelModalParams) => OpenModalActionCancel
  loading:boolean;
  detailData:any;
  log:any;
  SetTransferDetail:(params:TransferDetailParams) => SetTransferDetailAction;
  SetTransferOperatelog:(params:TransferDetailParams) => SetTransferOperatelogAction;
}

class Container extends React.Component<Props> {
  /*tslint:disable:variable-name*/
  logColumns = [
    {
      title: '操作人',
      dataIndex: 'operator',
    },
    {
      title: '时间',
      dataIndex: 'created',
      render: (t:any,_r:any,_i:number) => moment(t).format('YYYY/MM/DD hh:mm:ss')
    },
    {
      title: '操作类别',
      dataIndex: 'operatingType',
    },
    {
      title: '操作日志',
      dataIndex: 'operatingContent',
    }
  ]

  productColumns = [
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
      title: '调拨数量',
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
    this.props.SetTransferDetail({
      transferStockId:this.props.id
    })
    this.props.SetTransferOperatelog({
      transferStockId:this.props.id
    })
  }

  onMenuClick = (e:ClickParam) => {
    switch(e.key)
      {
      case '1':
        this.onStockIn()
        break;
      case '2':
        this.onStockCancel()
        break;
      }
  }

  onGoBack = () => {
    store.dispatch(go(-1));
  }

  onStockIn = () => {
    this.props.OpenModalIn(this.props.detailData[0]);
  }
  onStockCancel = () => {
    this.props.OpenModalCancel(this.props.detailData[0]);
  }


  
  render() {
    const data:any = Object.assign({},this.props.detailData[0]) ;
    const log = this.props.log;

    const productVos = data.productVos ? 
    [
      ...data.productVos,
      {index : totalFlage, stockCount:utils.sumByKey(data.productVos,'stockCount')}
    ] : [];

    productVos.forEach((o:any,i:number) => { o.index = o.index || i});

    const $title = <>
      调拨明细
      <a href="javascript:;" onClick={this.onGoBack}> <Icon type="left" /> 回到上级 </a>
    </>
    const $menu = <Menu onClick={this.onMenuClick}>
                    {data.transferStatus==='在途' ? <Menu.Item key="1">入库</Menu.Item> : <></>}
                    {data.transferStatus==='在途' ? <Menu.Item key="">作废</Menu.Item> : <></>}
                  </Menu>

    const $dropdown = data.transferStatus==='在途' ? <Dropdown overlay={$menu}>
                                                      <Button type = 'primary'>
                                                        操作 <Icon type="down" />
                                                      </Button>
                                                    </Dropdown>
                                                    :<></>

    return <>
      <Card bordered={false} title={$title}>
        <Spin spinning={this.props.loading}>
          <Row>
            <Col span={5}>
            调出仓：{data.stockOutWarehouseName}
            </Col>
            <Col span={5}>
            调入仓：{data.stockInWarehouseName}
            </Col>
            <Col span={5}>
            调出时间: {moment(data.stockOutTime).format('YYYY/MM/DD hh:mm:ss') }
            </Col>
            <Col span={5}>
            状态：{data.transferStatus}
            </Col>
            <Col span={4}>
              {$dropdown}
            </Col>
          </Row>

          <Table rowKey="index" bordered={false} pagination={false} dataSource={productVos} columns={this.productColumns} />

          <p>备注说明：{data.stockRemark}</p>
          <p>制单人：{data.operator}</p>
          <h3>操作日志</h3>

          <Table rowKey="created" bordered={false} pagination={false} dataSource={log} columns={this.logColumns} />
        </Spin>
      </Card>
      <StockInModalContainer />
      <StockCancelModalContainer />
    </>
  }
}

const mapStateToProps = (state: State) => ({
  loading:fromWarehouse.getTransferDetailLoading(state),
  detailData:fromWarehouse.getTransferDetailDetailData(state),
  log:fromWarehouse.getTransferDetailLog(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  OpenModalIn:(params:StockInModalParams) => dispatch(OpenModalIn(params)),
  OpenModalCancel:(params:StockCancelModalParams) => dispatch(OpenModalCancel(params)),
  SetTransferDetail : (params:TransferDetailParams) => dispatch(SetTransferDetail(params)),
  SetTransferOperatelog : (params:TransferDetailParams) => dispatch(SetTransferOperatelog(params)),
});

export const TransferDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
