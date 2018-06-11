import {TableState} from '@app/shared/models';
import { Pagination } from '../models';

export const formItemLayout = {
  labelCol: {
    lg: { span: 24 },
    xl: { span: 2 },
  },
  wrapperCol: {
    lg: { span: 24 },
    xl: { span: 22 },
  },
};

export const formItemInModalLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const defaultPagination: Pagination = {
  current: 1, 
  pageSize: 10,
  total: 0,
};

const host = '//stock-supply-dev.mtscrm.com/stock-supply';
const fileUploadUrl = host + '/v1/file';

export const defaultUploadProps = {
  name: 'file',
  action: fileUploadUrl,
  headers: {
    'x-app-id': 'xcrm-web',
    'Authorization': '1rU9IRSJwk4MS7rk-c',
  }
}
export const formTailLayout = {
  labelCol: {
    lg: { span: 24 },
    xl: { span: 2 },
  },
  wrapperCol: {
    lg: { span: 24 },
    xl: { span: 22 ,offset:2},
  },
};

export const toolbarLableCol = {
  lg: { span: 4 },
  xl	: { span: 2 }
}

export const baseTableConfig = {
  showSizeChanger:true,
  defaultPageSize:15,
  pageSizeOptions:['15','30','100','200','300']
}

export const initTableStateConfig :TableState = { // 初始化table的参数
  pageNo:1,
  total:0,
  pageSize:15,
  entities:[],
  loaded:false,
  loading:false,
  queryParams:{}
}

export const trueOrfalseSelectors = [
  {label:'是', value:true},
  {label:'否', value:false},
]

export const totalFlage = '这是条合计'
export const redTagColor = '#FF715F';
export const payTypeMap = {
  ZFFS_XJZF:'现金支付',
  ZFFS_ZFB:'支付宝',
  ZFFS_YHZZ:'银行转账',
  ZFFS_SK:'刷卡',
  ZFFS_WXZF:'微信支付',
  ZFFS_POS:'POS机'
};

