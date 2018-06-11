import { combineReducers, Reducer } from 'redux';
import { createSelector } from 'reselect';

import { State as RootState } from '@app/root';

import * as fromEntity from './entity';
import * as fromDocuments from './entity/document';
import * as fromForm from './entity/form';
import * as fromImages from './entity/image';
import * as fromPrice from './entity/price';
import * as fromOnShelfModal from './onShelfModal';
import * as fromProducts from './product';

export interface State {
  products: fromProducts.State;
  onShelfModal: fromOnShelfModal.State;
  entity: fromEntity.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  products: fromProducts.reducer,
  onShelfModal: fromOnShelfModal.reducer,
  entity: fromEntity.reducer,
});

export const getProductState = (state: RootState): State => state.product;


export const getProductsState = createSelector(
  getProductState,
  (state: State) => state.products,
);

export const getProductsLoaded = createSelector(
  getProductsState,
  fromProducts.getLoaded,
);

export const getProductsLoading = createSelector(
  getProductsState,
  fromProducts.getLoading,
);

export const getProducts = createSelector(
  getProductsState,
  fromProducts.getProducts,
);

export const getProductPagination = createSelector(
  getProductsState,
  fromProducts.getPagination,
);

export const getProductSelectedRowKeys = createSelector(
  getProductsState,
  fromProducts.getSelectedRowKeys,
);

export const getProductColumns = createSelector(
  getProductsState,
  fromProducts.getColumns,
);

export const getOnShelfModalState = createSelector(
  getProductState,
  (state: State) => state.onShelfModal,
);

export const getOnShelfModalVisible = createSelector(
  getOnShelfModalState,
  fromOnShelfModal.getVisible,
);

export const getOnShelfModalConfirmLoading = createSelector(
  getOnShelfModalState,
  fromOnShelfModal.getConfirmLoading,
);

export const getEntityState = createSelector(
  getProductState,
  (state: State) => state.entity,
);

export const getImageState = createSelector(
  getEntityState,
  (state: fromEntity.State) => state.images,
);

export const getImagePreviewVisible = createSelector(
  getImageState,
  fromImages.getPreviewVisible,
);

export const getImagePreview = createSelector(
  getImageState,
  fromImages.getPreviewImage,
);

export const getImageList = createSelector(
  getImageState,
  fromImages.getFileList,
);

export const getDescription = createSelector(
  getEntityState,
  (state: fromEntity.State) => state.description,
);

export const getPriceState = createSelector(
  getEntityState,
  (state: fromEntity.State) => state.price,
);

export const getPrice = createSelector(
  getPriceState,
  fromPrice.getPrice,
);

export const getDealerLevelPriceList = createSelector(
  getPriceState,
  fromPrice.getDealerLevelPriceList,
);

export const getDealerPriceList = createSelector(
  getPriceState,
  fromPrice.getDealerPriceList,
);

export const getHasDealerPrice = createSelector(
  getPriceState,
  fromPrice.getHasDealerPrice,
);

export const getDealers = createSelector(
  getPriceState,
  fromPrice.getDealers,
);

export const getDocumentState = createSelector(
  getEntityState,
  (state: fromEntity.State) => state.documents,
);

export const getDocumentList = createSelector(
  getDocumentState,
  fromDocuments.getFileList,
);

export const getFormState = createSelector(
  getEntityState,
  (state: fromEntity.State) => state.form,
);

export const getFormValues = createSelector(
  getFormState,
  fromForm.getValues,
);
