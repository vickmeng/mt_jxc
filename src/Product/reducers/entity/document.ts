import { UploadFile } from 'antd/lib/upload/interface';

import { imageHost } from '@app/shared/constants';
import { UploadResponse } from '@app/shared/models';
import {
  LoadSuccessAction,
  ProductActionsUnion,
  ProductActionTypes,
  UpdateDocumentListAction,
} from '../../actions/product';
import { mapToFileList } from '../../utils';

const transformFile = (file: UploadFile): UploadFile => {
  if (file.status === 'done') {
    const qiniuFileName = file.filename || (file.response as UploadResponse).qiniuFileName;
    file.name = qiniuFileName;
    file.url = `${imageHost}/${qiniuFileName}`
    file.filename = qiniuFileName;
  }
  return file;
};

export interface State {
  fileList: UploadFile[];
}

const initialState: State = {
  fileList: [],
};

export const reducer = (
  state: State = initialState,
  action: ProductActionsUnion,
): State => {
  switch (action.type) {

    case ProductActionTypes.UpdateDocumentList:
      return {
        fileList: (action as UpdateDocumentListAction).payload.map(transformFile),
      };
    
    case ProductActionTypes.LoadSuccess:
      return {
        fileList: mapToFileList((action as LoadSuccessAction).payload.basic.attach),
      };

    default:
      return state;
  }
};

export const getFileList = (state: State): UploadFile[] => state.fileList;