import * as moment from 'moment';
import { RouteComponentProps } from 'react-router-dom';

import { TablePaginationConfig } from 'antd/lib/table';

export interface TableData<T> {
  list: T[];
  pageNo: number;
  pageSize: number;
  totalCount: number;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

export interface TableChangeData {
  pagination?: Pagination;
}

export interface SortParams {
  prePriority: number;
  afterPriority: number;
}

export interface Sortable {
  priority: number;
}

export interface ColumnData<T = {}> {
  title: string;
  label: string;
  key: string;
  dataIndex?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  selected: boolean;
  disabled?: boolean;
}

export interface UploadResponse {
  fileName: string;
  qiniuFileName: string;
}

// 路由相关 start
export interface ViewWithParamProps extends RouteComponentProps<any> {}// url-params
// 路由相关

// table相关 start

export interface PaginationConfig extends TablePaginationConfig{// 分页参数
    pageNo:number
}

export interface TableState extends PaginationConfig{ // table 参数
    loaded: boolean;
    loading: boolean;
    entities: any[];
    queryParams:any
}
// table相关 end

// timeToolbar相关 start
export interface TimePickerOutput{
    st:string | moment.Moment;
    et:string | moment.Moment;
}

export type TimePickerValueType = 'today' | 'yesterday' | 'thismouth' | 'lastmouth';

export interface TimePickerItem {
    label:string;
    value:TimePickerValueType;
  }
// timeToolbar相关 end
export interface Selector {
  label:string,
  value:any
}

export interface FileResponse {
  fileName:'',
  qiniuFileName:''
}

export interface Payload<T> {
  body?:T,
  callBack?: () => void
}

