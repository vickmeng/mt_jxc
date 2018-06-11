import { combineReducers, Reducer } from 'redux';
import { createSelector } from 'reselect';

import { State as RootState } from '@app/root';

import * as fromCategory from './category';
import * as fromCategories from './category/category';
import * as fromCategoryCreateModal from './category/createModal';
import * as fromCategoryUpdateModal from './category/updateModal';

import * as fromBrand from './brand';
import * as fromBrands from './brand/brand';
import * as fromBrandCreateModal from './brand/createModal';
import * as fromBrandUpdateModal from './brand/updateModal';

import * as fromUnit from './unit';
import * as fromUnitCreateModal from './unit/createModal';
import * as fromUnits from './unit/unit';
import * as fromUnitUpdateModal from './unit/updateModal';

import * as fromDealerLevel from './dealerLevel';
import * as fromDealerLevelCreateModal from './dealerLevel/createModal';
import * as fromDealerLevels from './dealerLevel/dealerLevel';
import * as fromDealerLevelUpdateModal from './dealerLevel/updateModal';

import * as fromWarehouse from './warehouse';
import * as fromWarehouseCreateModal from './warehouse/createModal';
import * as fromWarehouseUpdateModal from './warehouse/updateModal';
import * as fromWarehouses from './warehouse/warehouse';

import * as fromDealer from './dealer';

export interface State {
  category: fromCategory.State;
  brand: fromBrand.State;
  unit: fromUnit.State;
  dealerLevel: fromDealerLevel.State;
  warehouse: fromWarehouse.State;
  dealer: fromDealer.State;
}

export const reducer: Reducer<State> = combineReducers<State>({
  category: fromCategory.reducer,
  brand: fromBrand.reducer,
  unit: fromUnit.reducer,
  dealerLevel: fromDealerLevel.reducer,
  warehouse: fromWarehouse.reducer,
  dealer: fromDealer.reducer,
});

export const getSettingState = (state: RootState): State => state.setting;


/*************** Category ***************/
export const getCategoryState = createSelector(
  getSettingState,
  (state: State) => state.category,
);

export const getCategoriesState = createSelector(
  getCategoryState,
  (state: fromCategory.State) => state.categories,
);

export const getCategoryLoaded = createSelector(
  getCategoriesState,
  fromCategories.getLoaded,
);

export const getCategoryLoading = createSelector(
  getCategoriesState,
  fromCategories.getLoading,
);

export const getCategories = createSelector(
  getCategoriesState,
  fromCategories.getCategories,
);

export const getCategorySelectedRowKeys = createSelector(
  getCategoriesState,
  fromCategories.getSelectedRowKeys,
);

export const getCategoryCreateModalState = createSelector(
  getCategoryState,
  (state: fromCategory.State) => state.createModal,
);

export const getCategoryCreateModalVisible = createSelector(
  getCategoryCreateModalState,
  (state: fromCategoryCreateModal.State) => state.visible,
);

export const getCategoryCreateModalConfirmLoading = createSelector(
  getCategoryCreateModalState,
  (state: fromCategoryCreateModal.State) => state.confirmLoading,
);

export const getCategoryUpdateModalState = createSelector(
  getCategoryState,
  (state: fromCategory.State) => state.updateModal,
);

export const getCategoryUpdateModalVisible = createSelector(
  getCategoryUpdateModalState,
  (state: fromCategoryUpdateModal.State) => state.visible,
);

export const getCategoryUpdateModalConfirmLoading = createSelector(
  getCategoryUpdateModalState,
  (state: fromCategoryUpdateModal.State) => state.confirmLoading,
);

export const getCategoryUpdateModalEditedEntity = createSelector(
  getCategoryUpdateModalState,
  (state: fromCategoryUpdateModal.State) => state.editedEntity,
);
/*************** Category ***************/


/*************** Brand ***************/
export const getBrandState = createSelector(
  getSettingState,
  (state: State) => state.brand,
);

export const getBrandsState = createSelector(
  getBrandState,
  (state: fromBrand.State) => state.brands,
);

export const getBrandLoaded = createSelector(
  getBrandsState,
  fromBrands.getLoaded,
);

export const getBrandLoading = createSelector(
  getBrandsState,
  fromBrands.getLoading,
);

export const getBrands = createSelector(
  getBrandsState,
  fromBrands.getBrands,
);

export const getBrandsSelectedRowKeys = createSelector(
  getBrandsState,
  fromBrands.getSelectedRowKeys,
);

export const getBrandCreateModalState = createSelector(
  getBrandState,
  (state: fromBrand.State) => state.createModal,
);

export const getBrandCreateModalVisible = createSelector(
  getBrandCreateModalState,
  fromBrandCreateModal.getVisible,
);

export const getBrandCreateModalConfirmLoading = createSelector(
  getBrandCreateModalState,
  fromBrandCreateModal.getConfirmLoading,
);

export const getBrandUpdateModalState = createSelector(
  getBrandState,
  (state: fromBrand.State) => state.updateModal,
);

export const getBrandUpdateModalVisible = createSelector(
  getBrandUpdateModalState,
  fromBrandUpdateModal.getVisible,
);

export const getBrandUpdateModalConfirmLoading = createSelector(
  getBrandUpdateModalState,
  fromBrandUpdateModal.getConfirmLoading,
);

export const getBrandUpdateModalEditedEntity = createSelector(
  getBrandUpdateModalState,
  fromBrandUpdateModal.getEditedEntity,
);
/*************** Brand ***************/


/*************** Unit ***************/
export const getUnitState = createSelector(
  getSettingState,
  (state: State) => state.unit,
);

export const getUnitsState = createSelector(
  getUnitState,
  (state: fromUnit.State) => state.units,
);

export const getUnitLoaded = createSelector(
  getUnitsState,
  fromUnits.getLoaded,
);

export const getUnitLoading = createSelector(
  getUnitsState,
  fromUnits.getLoading,
);

export const getUnits = createSelector(
  getUnitsState,
  fromUnits.getUnits,
);

export const getUnitCreateModalState = createSelector(
  getUnitState,
  (state: fromUnit.State) => state.createModal,
);

export const getUnitCreateModalVisible = createSelector(
  getUnitCreateModalState,
  fromUnitCreateModal.getVisible,
);

export const getUnitCreateModalConfirmLoading = createSelector(
  getUnitCreateModalState,
  fromUnitCreateModal.getConfirmLoading,
);

export const getUnitUpdateModalState = createSelector(
  getUnitState,
  (state: fromUnit.State) => state.updateModal,
);

export const getUnitUpdateModalVisible = createSelector(
  getUnitUpdateModalState,
  fromUnitUpdateModal.getVisible,
);

export const getUnitUpdateModalConfirmLoading = createSelector(
  getUnitUpdateModalState,
  fromUnitUpdateModal.getConfirmLoading,
);

export const getUnitUpdateModalEditedEntity = createSelector(
  getUnitUpdateModalState,
  fromUnitUpdateModal.getEditedEntity,
);
/*************** Unit ***************/


/*************** Dealer Level ***************/
export const getDealerLevelState = createSelector(
  getSettingState,
  (state: State) => state.dealerLevel,
);

export const getDealerLevelsState = createSelector(
  getDealerLevelState,
  (state: fromDealerLevel.State) => state.dealerLevels,
);

export const getDealerLevelLoaded = createSelector(
  getDealerLevelsState,
  fromDealerLevels.getLoaded,
);

export const getDealerLevelLoading = createSelector(
  getDealerLevelsState,
  fromDealerLevels.getLoading,
);

export const getDealerLevels = createSelector(
  getDealerLevelsState,
  fromDealerLevels.getDealerLevels,
);

export const getDealerLevelCreateModalState = createSelector(
  getDealerLevelState,
  (state: fromDealerLevel.State) => state.createModal,
);

export const getDealerLevelCreateModalVisible = createSelector(
  getDealerLevelCreateModalState,
  fromDealerLevelCreateModal.getVisible,
);

export const getDealerLevelCreateModalConfirmLoading = createSelector(
  getDealerLevelCreateModalState,
  fromDealerLevelCreateModal.getConfirmLoading,
);

export const getDealerLevelUpdateModalState = createSelector(
  getDealerLevelState,
  (state: fromDealerLevel.State) => state.updateModal,
);

export const getDealerLevelUpdateModalVisible = createSelector(
  getDealerLevelUpdateModalState,
  fromDealerLevelUpdateModal.getVisible,
);

export const getDealerLevelUpdateModalConfirmLoading = createSelector(
  getDealerLevelUpdateModalState,
  fromDealerLevelUpdateModal.getConfirmLoading,
);

export const getDealerLevelUpdateModalEditedEntity = createSelector(
  getDealerLevelUpdateModalState,
  fromDealerLevelUpdateModal.getEditedEntity,
);
/*************** Dealer Level ***************/


/*************** Warehouse ***************/
export const getWarehouseState = createSelector(
  getSettingState,
  (state: State) => state.warehouse,
);

export const getWarehousesState = createSelector(
  getWarehouseState,
  (state: fromWarehouse.State) => state.warehouses,
);

export const getWarehouseLoaded = createSelector(
  getWarehousesState,
  fromWarehouses.getLoaded,
);

export const getWarehouseLoading = createSelector(
  getWarehousesState,
  fromWarehouses.getLoading,
);

export const getWarehouses = createSelector(
  getWarehousesState,
  fromWarehouses.getEntities,
);

export const getWarehousePagination = createSelector(
  getWarehousesState,
  fromWarehouses.getPagination,
);

export const getWarehouseCreateModalState = createSelector(
  getWarehouseState,
  (state: fromWarehouse.State) => state.createModal,
);

export const getWarehouseCreateModalVisible = createSelector(
  getWarehouseCreateModalState,
  fromWarehouseCreateModal.getVisible,
);

export const getWarehouseCreateModalConfirmLoading = createSelector(
  getWarehouseCreateModalState,
  fromWarehouseCreateModal.getConfirmLoading,
);

export const getWarehouseUpdateModalState = createSelector(
  getWarehouseState,
  (state: fromWarehouse.State) => state.updateModal,
);

export const getWarehouseUpdateModalVisible = createSelector(
  getWarehouseUpdateModalState,
  fromWarehouseUpdateModal.getVisible,
);

export const getWarehouseUpdateModalConfirmLoading = createSelector(
  getWarehouseUpdateModalState,
  fromWarehouseUpdateModal.getConfirmLoading,
);

export const getWarehouseUpdateModalEditedEntity = createSelector(
  getWarehouseUpdateModalState,
  fromWarehouseUpdateModal.getEditedEntity,
);
/*************** Warehouse ***************/


/*************** Dealer ***************/
export const getDealerState = createSelector(
  getSettingState,
  (state: State) => state.dealer,
);

export const getDealerDeatilState = createSelector(
  getDealerState,
  (state: fromDealer.State) => state.detail,
);
/*************** Dealer ***************/