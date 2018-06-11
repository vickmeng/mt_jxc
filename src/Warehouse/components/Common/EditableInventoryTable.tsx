import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import * as utils from 'shared/utils';
import * as fromWarehouse from '../../reducers';

import {
  SetProducts,
  SetProductsAction,
} from '../../actions/common';

import { State } from '@app/root';

import { Button,InputNumber , Select, Table } from 'antd';
import {OptionProps} from 'antd/lib/select';

import {totalFlage} from 'shared/constants';

import {MTeditableCell} from 'shared/components'

import {EditableInventoryTableColumnProps as ColumnProps} from '../../models'


const Option = Select.Option;

interface Props {
  onChange:(body:any) => void
  Products:any[];
  setProducts: () => SetProductsAction;
}



class EditableInventoryTable  extends React.Component<Props> {
  state = {
    dataSource: [
      {
        key:1,
        index:1,
        stockCount:1,
        productRemark:'',
      }
    ],
  };
  /*tslint:disable:variable-name*/
  columns = [
    {
      title: ' ',
      width:50,
      dataIndex: 'index',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 6 , t)

    },
    {
      title: '操作',
      dataIndex: 'action',
      width:100,
      render:(_t:string , r:any , _i:number) => {
        let $inner = <></>
        if(this.state.dataSource.length>1){
          $inner = <Button type="danger" icon="delete" onClick={this.onDelete(r.key)} >删除</Button>
        }else{
          $inner = <></>
        }
        return utils.colspanFormatter( r.index , 0 , $inner)
      },
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      width:220,
      render:(_t:string , r:any , _i:number) => {
        const $inner = <ProductSelectCell 
                  data={this.props.Products} 
                  onChange={this.onProductChange(r.key)}
                />
        return utils.colspanFormatter( r.index , 0 , $inner)
      },
    },
    {
      title: '商品编码',
      width:150,
      dataIndex: 'productNO',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , t)
    },
    {
      title: '规格',
      width:100,
      dataIndex: 'specification',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , t)
    },
    {
      title: '单位',
      width:100,
      dataIndex: 'productUnitName',
      render:(t:string , r:any , _i:number) => utils.colspanFormatter( r.index , 0 , t)
    },
    {
      title: '入库数量',
      width:100,
      dataIndex: 'stockCount',
      render: (t:any , r:any , _i:number) => {
        const $inner =  <StockCountCell 
                          value={t} 
                          onChange = {this.onStockCountChange(r.key)}
                        />
        return utils.colspanFormatter( r.index , 2 , $inner, t)
      },
    },
    {
      title: '备注',
      dataIndex: 'productRemark',
      render:(t:string , r:any , _i:number) => {
        const $inner = <MTeditableCell 
                          value={t} 
                          onChange={this.onRemarkChange(r.key)}
                        />
        return utils.colspanFormatter( r.index , 0 , $inner)
      },
    }
  ]

  constructor(props: Props) {
    super(props);
  }

  componentWillMount(){
    this.props.setProducts();
  }

  onAdd = () => {
    const { dataSource } = this.state;
    const newColumn = {
      index:dataSource.length+1,
      key : dataSource[dataSource.length-1].key + 1,
      stockCount:1,
      productRemark:'',
    };
    this.setState({
      dataSource: [...dataSource, newColumn],
    });
  }

  onDelete = (key:number) => {
    return () => {
      const newDataSource = [...this.state.dataSource].filter(item => item.key !== key);
      newDataSource.forEach((o,i)=>{o.index = i+1});
      this.setState({ 
        dataSource: newDataSource
       });
      this.props.onChange(newDataSource);
    }
  }

  onProductChange = (key:number) => {
    return (value:string,_option:any) => {
      const selectedId = value.split(',')[0];
      const selectedProduct = this.props.Products.filter(o => +o.productId === +selectedId)[0];
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      (target as ColumnProps).productId = selectedProduct.productId;
      (target as ColumnProps).productNO = selectedProduct.productNO;
      (target as ColumnProps).productUnitName = selectedProduct.productUnitName;
      (target as ColumnProps).specification = selectedProduct.specification;
      this.setState({dataSource });
      this.props.onChange(dataSource);
    }
    
  }

  onStockCountChange = (key:number) => {
    return (value:number) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      (target as ColumnProps).stockCount = value;
      this.setState({ dataSource });
      this.props.onChange(dataSource);
    }
  }

  onRemarkChange = (key:number) => {
    return (value:string) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      (target as ColumnProps).productRemark = value;
      this.setState({ dataSource });
      this.props.onChange(dataSource);
    };
  }

  render() {
    const  dataSource  = [
      ...this.state.dataSource,
      {
        index:totalFlage,key:totalFlage, 
        stockCount:utils.sumByKey(this.state.dataSource , 'stockCount')
      }
    ];
    return <>
      <Button type="primary" icon="plus" className="editable-add-btn" onClick={this.onAdd}>新建</Button>
      <Table bordered={false} pagination={false} dataSource={dataSource} columns={this.columns} />
    </>
  }
};

const mapStateToProps = (state: State) => ({
  Products: fromWarehouse.getCommonProducts(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProducts: () => dispatch(SetProducts()),
});

export const EditableInventoryTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditableInventoryTable);

interface ProductSelectCellProps {
  onChange:(values:string,option:any) => void;
  data:any[]
}

class ProductSelectCell extends React.Component<ProductSelectCellProps>{
  filterOption= (input:string, option:React.ReactElement<OptionProps>) => {
    const value = (option as any).props.value.split(',');
    return value[1].indexOf(input) >= 0 || value[2].indexOf(input) >= 0 ;
  }
  
  render(){
    return <Select
      showSearch
      style={{ width: 200 }}
      placeholder="请输入编码/商品名称"
      onChange = {this.props.onChange}
      filterOption={this.filterOption}
    >
      {
        /*tslint:disable:variable-name*/
        this.props.data.map( (o,_i) => 
          <Option key={o.productId} value={o.productId +','+o.productName+','+o.productNO}>
            {o.productName}
          </Option > 
        )
      }
    </Select>
  }
}


interface StockCountCellProps {
  onChange:(values:number) => void;
  value:number;
}

class StockCountCell extends React.Component<StockCountCellProps>{
  render(){
    return  <InputNumber min={1}  defaultValue={(this.props.value as number)} onChange={this.props.onChange} />
  }
}

// interface RemarkCellProps {
//   onChange:(values:string) => void;
//   value:string;
// }

// class RemarkCell extends React.Component<RemarkCellProps> {
//   state = {
//     value: this.props.value,
//     editable: false,
//   }
//   handleChange = (e:any) => {
//     const value = e.target.value;
//     this.setState({ value });
//   }
//   check = () => {
//     this.setState({ editable: false });
//     if (this.props.onChange) {
//       this.props.onChange(this.state.value);
//     }
//   }
//   edit = () => {
//     this.setState({ editable: true });
//   }
//   render() {
//     const { value, editable } = this.state;
//     return (
//       <div className="editable-cell">
//         {
//           editable ?
//             <div className="editable-cell-input-wrapper">
//               <Input
//                 style={{width:'200px'}}
//                 value={value}
//                 onChange={this.handleChange}
//                 onPressEnter={this.check}
//                 onBlur ={this.check}
//               />
//               &nbsp;&nbsp;
//               <Icon
//                 type="check"
//                 className="editable-cell-icon-check"
//                 onClick={this.check}
//               />
//             </div>
//             :
//             <div className="editable-cell-text-wrapper">
//               {value || ' '}
//               <Icon
//                 type="edit"
//                 className="editable-cell-icon"
//                 onClick={this.edit}
//               />
//             </div>
//         }
//       </div>
//     );
//   }
// }