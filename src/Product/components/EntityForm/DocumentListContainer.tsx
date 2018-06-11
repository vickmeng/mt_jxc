import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { UploadFile } from 'antd/lib/upload/interface';

import { State } from '@app/root';
import {
  UpdateDocumentList,
} from '../../actions/product';
import * as fromProduct from '../../reducers';
import { DocumentList } from './DocumentList';

const mapStateToState = (state: State) => ({
  fileList: fromProduct.getDocumentList(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateDocumentList: (fileList: UploadFile[]) => dispatch(UpdateDocumentList(fileList)),
});

export const ProductDocumentListContainer = connect(
  mapStateToState,
  mapDispatchToProps,
)(DocumentList);
