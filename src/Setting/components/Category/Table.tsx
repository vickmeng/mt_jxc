import * as React from 'react';

import { Divider, Modal, Table } from 'antd';

import { SortButtonGroup } from '@app/shared/components';
import { SortActions } from '@app/shared/constants';
import { getSortParams } from '@app/shared/utils';
import {
  ChangeSelectedRowKeysAction,
  DeleteAction,
  OpenUpdateModalAction,
  SortAction,
} from '../../actions/category';
import { Category, CategorySortParams } from '../../models';

class CategoryColumn extends Table.Column<Category> {}
class CategoryTable extends Table<Category> {}

interface Props {
  categories: Category[];
  loading: boolean;
  selectedRowKeys: number[];
  openUpdateModal: (category: Category) => OpenUpdateModalAction;
  deleteById: (categoryId: number) => DeleteAction;
  onSelectChange: (categoryIds: number[]) => ChangeSelectedRowKeysAction;
  sort: (sortParams: CategorySortParams) => SortAction;
}

export const CategoryTableWrapper: React.SFC<Props> = ({
  categories,
  loading,
  selectedRowKeys,
  openUpdateModal,
  deleteById,
  onSelectChange,
  sort,
}) => {

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showDeleteConfirm = (category: Category) => {
    Modal.confirm({
      title: '确定是否删除商品分类？',
      okType: 'danger',
      onOk() {
        deleteById(category.id);
      },
    });
  };

  const actionRender = (row: Category) => {
    return (
      <>
        <a href="javascript:;" onClick={ openUpdateModal.bind(null, row) }>编辑</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={ showDeleteConfirm.bind(null, row) }>删除</a>
      </>
    );
  };

  /*tslint:disable:variable-name*/
  const sortRender = (_text: Category, row: Category, index: number) => {
    return (
      <SortButtonGroup
        isTop={ index === 0 }
        isBottom={ index === categories.length - 1 }
        click={ handleSort.bind(null, index, row) }
      />
    );
  };

  const handleSort = (index: number, row: Category, action: SortActions): void => {
    const sortParams = getSortParams<Category>(categories, index, action);
    sort({
      ...sortParams,
      productCategoryId: row.id,
    });
  };

  return (
    <CategoryTable 
      rowKey="id" 
      dataSource={ categories }
      pagination={ false }
      loading={ loading }
      rowSelection={ rowSelection }
    >
      <CategoryColumn title="分类名称" key="productCategoryName" dataIndex="productCategoryName" />
      <CategoryColumn title="移动" key="sort" render={ sortRender } />
      <CategoryColumn title="操作" key="action" render={ actionRender } />
    </CategoryTable>
  );
};