import * as React from 'react';

import { ColumnImage } from '@app/shared/components';
import { ColumnData } from '@app/shared/models';
import { Product } from '../models';

export const productColumns: Array<ColumnData<Product>> = [
  {
    title: '图片',
    label: '商品图片',
    key: 'productImage',
    render: (row: Product) => <ColumnImage url={ row.productImage } />,
    selected: true,
  },
  {
    title: '编码',
    label: '商品编码',
    key: 'productNO',
    dataIndex: 'productNO',
    selected: true,
  },
  {
    title: '名称',
    label: '商品名称',
    key: 'productName',
    dataIndex: 'productName',
    selected: true,
    disabled: true,
  },
  {
    title: '规格',
    label: '商品规格',
    key: 'specification',
    dataIndex: 'specification',
    selected: true,
  },
  {
    title: '单位',
    label: '单位',
    key: 'productUnitName',
    dataIndex: 'productUnitName',
    selected: true,
  },
  {
    title: '市场价',
    label: '市场价',
    key: 'price',
    dataIndex: 'price',
    selected: true,
  },
  {
    title: '成本价',
    label: '成本价',
    key: 'cost',
    dataIndex: 'cost',
    selected: true,
  },
  {
    title: '库存数量',
    label: '库存数量',
    key: 'stockCount',
    dataIndex: 'stockCount',
    selected: false,
  },
  {
    title: '库存成本',
    label: '库存成本',
    key: 'stockCost',
    dataIndex: 'stockCost',
    selected: false,
  },
  {
    title: '状态',
    label: '状态',
    key: 'isOnline',
    render: (row: Product) => row.isOnline ? '上架' : '下架',
    selected: true,
  },
  {
    title: '品牌',
    label: '品牌',
    key: 'productBrandName',
    dataIndex: 'productBrandName',
    selected: true,
  },
  {
    title: '分类',
    label: '分类',
    key: 'productCategoryName',
    dataIndex: 'productCategoryName',
    selected: true,
  },
  {
    title: '排序值',
    label: '排序值',
    key: 'sort',
    dataIndex: 'sort',
    selected: false,
  },
];

