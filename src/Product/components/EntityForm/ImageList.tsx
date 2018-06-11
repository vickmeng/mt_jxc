import * as React from 'react';

import { Card, Icon, Modal, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

import { defaultUploadProps } from '@app/shared/constants';
import {
  CloseImagePreviewAction,
  OpenImagePreviewAction,
  UpdateImageListAction,
} from '../../actions/product';

interface Props {
  previewVisible: boolean;
  previewImage: string;
  fileList: UploadFile[];
  openPreviewModal: (url: string) => OpenImagePreviewAction;
  closePreviewModal: () => CloseImagePreviewAction;
  updateImageList: (fileList: UploadFile[]) => UpdateImageListAction;
}

export const ProductImageList: React.SFC<Props> = ({
  previewVisible,
  previewImage,
  fileList,
  openPreviewModal,
  closePreviewModal,
  updateImageList,
}) => {

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );

  const handlePreview = (file: UploadFile): void => {
    openPreviewModal(file.url as string);
  }

  const handleChange = (info: UploadChangeParam): void => {
    updateImageList(info.fileList);
  };

  return (
    <Card title="商品图片">
      <div className="clearfix">
        <Upload
          { ...defaultUploadProps }
          listType="picture-card"
          fileList={ fileList }
          onPreview={ handlePreview }
          onChange={ handleChange }
        >
          { fileList.length >= 5 ? null : uploadButton }
        </Upload>
        <Modal visible={ previewVisible } footer={ null } onCancel={ closePreviewModal }>
          <img alt="example" style={{ width: '100%' }} src={ previewImage } />
        </Modal>
      </div>
    </Card>
  );
};