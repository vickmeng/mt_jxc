import * as React from 'react';
import { RouterAction } from 'react-router-redux';

import { Divider, Table } from 'antd';

import { ColumnData, Pagination, TableChangeData } from '@app/shared/models';
import {
  ChangeSelectedRowKeysAction,
  ChangeTableAction,
} from '../actions/product';
import { Product } from '../models';

class ProductColumn extends Table.Column<Product> { }
class ProductTable extends Table<Product> { }

interface Props {
  products: Product[];
  loading: boolean;
  pagination: Pagination;
  selectedRowKeys: number[];
  columns: Array<ColumnData<Product>>;
  changeTable: (changeData: TableChangeData) => ChangeTableAction;
  onSelectChange: (productIds: number[]) => ChangeSelectedRowKeysAction;
  goToUpdate: (productId: number) => RouterAction;
}

export const ProductTableWrapper: React.SFC<Props> = ({
  products,
  loading,
  pagination,
  selectedRowKeys,
  columns,
  changeTable,
  onSelectChange,
  goToUpdate,
}) => {

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const actionRender = (row: Product) => {
    return (
      <>
        <a href="javascript:;">详情</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={ goToUpdate.bind(null, row.productId) }>编辑</a>
      </>
    );
  };

  const handleTableChange = (currentPagination: Pagination) => {
    changeTable({
      pagination: currentPagination,
    });
  };

  return (
    <ProductTable
      rowKey="productId"
      dataSource={ products }
      loading={ loading }
      pagination={ pagination }
      onChange={ handleTableChange }
      rowSelection={ rowSelection }
    >
      { columns.map(column => 
          column.selected && <ProductColumn key={ column.key } { ...column } />
      ) }
      <ProductColumn title="操作" key="action" render={ actionRender } />
    </ProductTable>
  );
};