import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UploadFile } from 'antd/lib/upload/interface';

import { State } from '@app/root';
import {
  CloseImagePreview,
  OpenImagePreview,
  UpdateImageList,
} from '../../actions/product';
import * as fromProduct from '../../reducers';
import { ProductImageList } from './ImageList';

const mapStateToProps = (state: State) => ({
  previewVisible: fromProduct.getImagePreviewVisible(state),
  previewImage: fromProduct.getImagePreview(state),
  fileList: fromProduct.getImageList(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openPreviewModal: (url: string) => dispatch(OpenImagePreview(url)),
  closePreviewModal: () => dispatch(CloseImagePreview()),
  updateImageList: (fileList: UploadFile[]) => dispatch(UpdateImageList(fileList)),
});

export const ProductImageListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductImageList);