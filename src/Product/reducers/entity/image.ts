import { UploadFile } from 'antd/lib/upload/interface';

import { imageHost } from '@app/shared/constants';
import { UploadResponse } from '@app/shared/models';
import {
  LoadSuccessAction,
  OpenImagePreviewAction,
  ProductActionsUnion,
  ProductActionTypes,
  UpdateImageListAction,
} from '../../actions/product';
import { mapToFileList } from '../../utils';

const transformFile = (file: UploadFile): UploadFile => {
  if (file.status === 'done') {
    const qiniuFileName = file.filename || (file.response as UploadResponse).qiniuFileName;
    file.url = `${imageHost}/${qiniuFileName}`
    file.filename = qiniuFileName;
  }
  return file;
};

export interface State {
  previewVisible: boolean;
  previewImage: string;
  fileList: UploadFile[];
}

const initialState: State = {
  previewVisible: false,
  previewImage: '',
  fileList: [],
};

export const reducer = (
  state: State = initialState,
  action: ProductActionsUnion,
): State => {
  switch (action.type) {

    case ProductActionTypes.OpenImagePreview:
      return {
        ...state,
        previewVisible: true,
        previewImage: (action as OpenImagePreviewAction).payload,
      };

    case ProductActionTypes.CloseImagePreview:
      return {
        ...state,
        previewVisible: false,
        previewImage: '',
      };
    
    case ProductActionTypes.UpdateImageList:
      return {
        ...state,
        fileList: (action as UpdateImageListAction).payload.map(transformFile),
      };

    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        fileList: mapToFileList((action as LoadSuccessAction).payload.basic.productImage),
      };

    default:
      return state;
  }
};

export const getPreviewVisible = (state: State): boolean => state.previewVisible;

export const getPreviewImage = (state: State): string => state.previewImage;

export const getFileList = (state: State): UploadFile[] => state.fileList;
