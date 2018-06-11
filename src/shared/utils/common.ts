import { SortActions } from '../constants';
import { Pagination, Sortable, SortParams, TableData } from '../models';

export const assertNever = (value: never): never => {
  throw Error(`不应该存在的值 '${value}'`);
};

export const transformPagination = <T>(tableData: TableData<T>): Pagination => ({
  current: tableData.pageNo,
  pageSize: tableData.pageSize,
  total: tableData.totalCount,
});

const geUpPriorityByIndex = <T extends Sortable>(list: T[], index: number): SortParams => {
  if (index <= 1) { 
    return {
      prePriority: 0,
      afterPriority: list[0].priority,
    };
  }
  return {
    prePriority: list[index - 2].priority,
    afterPriority: list[index - 1].priority,
  };
};

const getDownPriorityByIndex = <T extends Sortable>(list: T[], index: number): SortParams => {
  if (index >= list.length - 2) { 
    return {
      prePriority: list[list.length - 1].priority,
      afterPriority: 0,
    };
  }
  return {
    prePriority: list[index + 1].priority,
    afterPriority: list[index + 2].priority,
  };
};

export const getSortParams = <T extends Sortable>(list: T[], index: number, action: SortActions): SortParams => {
  switch (action) {

    case SortActions.Up:
      return geUpPriorityByIndex<T>(list, index);
    
    case SortActions.Down:
      return getDownPriorityByIndex<T>(list, index);

    case SortActions.Top:
      return {
        prePriority: 0,
        afterPriority: list[0].priority,
      };
    
    case SortActions.Bottom:
      return {
        prePriority: list[list.length - 1].priority,
        afterPriority: 0,
      };
    
    default:
      return assertNever(action);
  }
};