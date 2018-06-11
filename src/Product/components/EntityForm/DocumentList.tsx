import * as React from 'react';

import { Button, Card, Col, Icon, Row, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

import { defaultUploadProps } from '@app/shared/constants';
import {
  UpdateDocumentListAction,
} from '../../actions/product';

interface Props {
  fileList: UploadFile[];
  updateDocumentList: (fileList: UploadFile[]) => UpdateDocumentListAction;
}

export const DocumentList: React.SFC<Props> = ({
  fileList,
  updateDocumentList,
}) => {

  const handleChange = (info: UploadChangeParam): void => {
    // if (info.fileList.length === info.fileList.filter(file => file.status === 'done').length) {
    // }
    updateDocumentList(info.fileList);
  };

  return (
    <Card title="商品附件">
      <Row>
        <Col span={ 4 }>
          <Upload
            { ...defaultUploadProps }
            fileList={ fileList }
            multiple
            onChange={ handleChange }
          >
            <Button>
              <Icon type="upload" /> 点击上传附件
            </Button>
          </Upload>
        </Col>
        <Col>
          <span style={{ lineHeight: '30px' }}>商品附件最大20M，支持格式: PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF、RAR、ZIP</span>
        </Col>
      </Row>
    </Card>
  );
};