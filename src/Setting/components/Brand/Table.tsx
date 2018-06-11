import * as React from 'react';

import { Divider, Modal, Table } from 'antd';

import { SortButtonGroup } from '@app/shared/components';
import { SortActions } from '@app/shared/constants';
import { getSortParams } from '@app/shared/utils';
import {
  DeleteAction,
  OpenCreateModalAction,
  SortAction,
} from '../../actions/brand';
import { Brand, BrandSortParams } from '../../models';

class BrandColumn extends Table.Column<Brand> {}
class BrandTable extends Table<Brand> {}

interface Props {
  brands: Brand[];
  loading: boolean;
  openUpdateModal: (brand: Brand) => OpenCreateModalAction;
  deleteById: (brandId: number) => DeleteAction;
  sort: (sortParmas: BrandSortParams) => SortAction;
}

export const BrandTableWarpper: React.SFC<Props> = ({
  brands,
  loading,
  openUpdateModal,
  deleteById,
  sort,
}) => {

  const showDeleteConfirm = (brand: Brand) => {
    Modal.confirm({
      title: '确定是否删除商品品牌？',
      okType: 'danger',
      onOk() {
        deleteById(brand.id);
      },
    });
  };

  const actionRender = (row: Brand) => {
    return (
      <>
        <a href="javascript:;" onClick={ openUpdateModal.bind(null, row) }>编辑</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={ showDeleteConfirm.bind(null, row) }>删除</a>
      </>
    );
  };

  /*tslint:disable:variable-name*/
  const sortRender = (_text: Brand, row: Brand, index: number) => {
    return (
      <SortButtonGroup
        isTop={ index === 0 }
        isBottom={ index === brands.length - 1 }
        click={ handleSort.bind(null, index, row) }
      />
    );
  };

  const handleSort = (index: number, row: Brand, action: SortActions): void => {
    const sortParams = getSortParams<Brand>(brands, index, action);
    sort({
      ...sortParams,
      productBrandId: row.id,
    });
  };

  return (
    <BrandTable 
      rowKey="id" 
      dataSource={ brands }
      pagination={ false }
      loading={ loading }
    >
      <BrandColumn title="品牌名称" key="productBrandName" dataIndex="productBrandName" />
      <BrandColumn title="移动" key="sort" render={ sortRender } />
      <BrandColumn title="操作" key="action" render={ actionRender } />
    </BrandTable>
  )
}