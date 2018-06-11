import * as React from 'react';

import { Divider, Modal, Table } from 'antd';

import { Discount, SortButtonGroup } from '@app/shared/components';
import { SortActions } from '@app/shared/constants';
import { getSortParams } from '@app/shared/utils';
import {
  DeleteAction,
  OpenUpdateModalAction,
  SortAction,
} from '../../actions/dealerLevel';
import { DealerLevel, DealerLevelSortParams } from '../../models';

class DealerLevelColumn extends Table.Column<DealerLevel> { }
class DealerLevelTable extends Table<DealerLevel> { }

interface Props {
  dealerLevels: DealerLevel[];
  loading: boolean;
  openUpdateModal: (dealerLevel: DealerLevel) => OpenUpdateModalAction;
  deleteById: (dealerLevelId: number) => DeleteAction;
  sort: (sortParams: DealerLevelSortParams) => SortAction;
}

export const DealerLevelTableWrapper: React.SFC<Props> = ({
  dealerLevels,
  loading,
  openUpdateModal,
  deleteById,
  sort,
}) => {

  const showDeleteConfirm = (dealerLevel: DealerLevel) => {
    Modal.confirm({
      title: '确定是否删除该经销商级别？',
      content: '删除该经销商级别后，该级别下的客户将被转移至系统默认级别下',
      okType: 'danger',
      onOk() {
        deleteById(dealerLevel.id);
      }
    });
  }

  const actionRender = (row: DealerLevel) => {
    return (
      <>
        <a href="javascript:;" onClick={ openUpdateModal.bind(null, row) }>编辑</a>
        { row.id !== 0 && (
          <>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={ showDeleteConfirm.bind(null, row) }>删除</a>
          </>
        ) }
      </>
    );
  };

  const discountRender = (row: DealerLevel) => {
    return (
      <Discount discount={ row.discount } />
    );
  };

  /*tslint:disable:variable-name*/
  const sortRender = (_text: DealerLevel, row: DealerLevel, index: number) => {
    return (
      <SortButtonGroup
        isTop={ index === 0 }
        isBottom={ index === dealerLevels.length - 1 }
        click={ handleSort.bind(null, index, row) }
      />
    );
  };

  const handleSort = (index: number, row: DealerLevel, action: SortActions): void => {
    const sortParams = getSortParams<DealerLevel>(dealerLevels, index, action);
    sort({
      ...sortParams,
      tenantLevelId: row.id,
    });
  };

  return (
    <DealerLevelTable
      rowKey="id"
      dataSource={ dealerLevels }
      pagination={ false }
      loading= { loading }
    >
      <DealerLevelColumn title="级别名称" key="tenantLevelName" dataIndex="tenantLevelName" />
      <DealerLevelColumn title="订货折扣" key="discount" render={ discountRender } />
      <DealerLevelColumn title="移动" key="sort" render={ sortRender } />
      <DealerLevelColumn title="操作" key="action" render={ actionRender } />
    </DealerLevelTable>
  );
}
