import * as React from 'react';

import {Table } from 'antd';

import { ColumnImage,MTeditableCell ,MTmoney } from 'shared/components';
import {totalFlage} from 'shared/constants';
import * as utils from 'shared/utils';
import {orderStatusType} from '../../models';

interface Props {
  orderStatus:orderStatusType,
  orderProducts:any[];
  realFee:number;
  totalFee:number;
  ChangeOrderProduct:(product:string,value:string) => {};
}

export class ProductTable  extends React.Component<Props> {
  static defaultProps = {
    orderProducts:[]
  }
  /*tslint:disable:variable-name*/
  columns = [
    {
      title: ' ',
      dataIndex: 'index',
      render:(t:string , r:any , i:number) => utils.colspanFormatter( r.index , 5 , t )

    },
    {
      title: '主图',
      dataIndex: 'productImage',
      render: (t:string , r:any , _i:number) =>  utils.colspanFormatter( r.index , 0 , <ColumnImage url={t} />) ,
    },
    {
      title: '名称',
      dataIndex: 'productName',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , t)
    },
    {
      title: '编码',
      dataIndex: 'productNO',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , t)
    },
    {
      title: '规格',
      dataIndex: 'specification',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , t)
    },
    {
      title: '数量',
      dataIndex: 'salesCount',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 3 , t,t)
    },
    {
      title: '单位',
      dataIndex: 'productUnitName',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , t)
    },
    {
      title: '单价',
      dataIndex: 'price',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , <MTmoney value={+t}/>)
    },
    {
      title: '小计',
      dataIndex: 'xj',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 2 , <MTmoney value={+t}/>,<MTmoney value={+t}/>)
    },
    {
      title: '备注',
      dataIndex: 'remark',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , this.judgeRemark(t,r.productId) )
    },
  ]

  constructor(props: Props) {
    super(props);
  }

  judgeRemark = (t:string,productId:string) => {
    return this.props.orderStatus === 'DDZT_DDDSH' ? <MTeditableCell value = {t} onChange = {this.onRemarkChange(productId)} /> : t
  }

  onRemarkChange = (productId:string) => (value:string)=> {
    this.props.ChangeOrderProduct(productId,value)
  }

  footer = () => {
    return  <> 
              审批特价 : {this.props.realFee}
              <br/>
              应付金额 : {this.props.totalFee}
            </>;
  }

  render() {
    const dataSource = [...this.props.orderProducts];

    dataSource.forEach( (o,i) =>{
      o.xj = o.price * o.salesCount;
      o.index = i+1
    });

    dataSource.push({
      index:totalFlage,
      salesCount:utils.sumByKey(dataSource , 'salesCount'),
      xj:utils.sumByKey(dataSource , 'xj')
    });

    return <Table
            rowKey='index'
            bordered={false}
            pagination={false}
            dataSource={dataSource}
            columns={this.columns}
            footer = {this.footer}
          />
  }
};