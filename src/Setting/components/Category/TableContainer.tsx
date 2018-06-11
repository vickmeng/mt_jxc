import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '@app/root';
import {
  ChangeSelectedRowKeys,
  ChangeSelectedRowKeysAction,
  Delete,
  DeleteAction,
  LoadAll,
  LoadAllAction,
  OpenUpdateModal,
  OpenUpdateModalAction,
  Sort,
  SortAction,
} from '../../actions/category';
import { Category, CategorySortParams } from '../../models';
import * as fromSetting from '../../reducers';
import { CategoryTableWrapper } from './Table';

interface Props {
  categories: Category[];
  loading: boolean;
  selectedRowKeys: number[];
  loadAll: () => LoadAllAction;
  openUpdateModal: (category: Category) => OpenUpdateModalAction;
  deleteById: (categoryId: number) => DeleteAction;
  onSelectChange: (categoryIds: number[]) => ChangeSelectedRowKeysAction;
  sort: (sortParams: CategorySortParams) => SortAction;
}

class Container extends React.Component<Props> {

  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    return <CategoryTableWrapper { ...this.props } />;
  }
}

const mapStateToProps = (state: State) => ({
  categories: fromSetting.getCategories(state),
  loading: fromSetting.getCategoryLoading(state),
  selectedRowKeys: fromSetting.getCategorySelectedRowKeys(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAll: () => dispatch(LoadAll()),
  openUpdateModal: (category: Category) => dispatch(OpenUpdateModal(category)),
  deleteById: (categoryId: number) => dispatch(Delete(categoryId)),
  onSelectChange: (categoryIds: number[]) => dispatch(ChangeSelectedRowKeys(categoryIds)),
  sort: (sortParams: CategorySortParams) => dispatch(Sort(sortParams)),
});

export const CategoryTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

