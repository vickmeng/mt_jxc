import {
  createBransEpic,
  deleteBrandEpic,
  loadBransEpic,
  sortBrandEpic,
  updateBransEpic,
} from './brand';
import {
  batchDeleteCategoryEpic,
  createCategoryEpic,
  deleteCategoryEpic,
  loadCategoriesEpic,
  sortCategoryEpic,
  updateCategoryEpic,
} from './category';
import {
  loadDealerEpic,
  updateDealerpic,
} from './dealer';
import {
  createDealerLevelEpic,
  deleteDealerLevelEpic,
  loadDealerLevelsEpic,
  sortDealerLevelEpic,
  updateDealerLevelEpic,
} from './dealerLevel';
import {
  createUnitEpic,
  deleteUnitEpic,
  loadUnitsEpic,
  updateUnitEpic,
} from './unit';
import {
  createWarehouseEpic,
  deleteWarehouseEpic,
  loadWarehousesEpic,
  setDefaultWarehouseEpic,
  setWarehouseStatusEpic,
  updateWarehouseEpic,
} from './warehouse';

export const settingEpics = [
  createBransEpic,
  deleteBrandEpic,
  loadBransEpic,
  sortBrandEpic,
  updateBransEpic,

  batchDeleteCategoryEpic,
  createCategoryEpic,
  loadCategoriesEpic,
  deleteCategoryEpic,
  sortCategoryEpic,
  updateCategoryEpic,

  loadDealerEpic,
  updateDealerpic,

  createDealerLevelEpic,
  deleteDealerLevelEpic,
  loadDealerLevelsEpic,
  sortDealerLevelEpic,
  updateDealerLevelEpic,

  createUnitEpic,
  deleteUnitEpic,
  loadUnitsEpic,
  updateUnitEpic,

  createWarehouseEpic,
  deleteWarehouseEpic,
  loadWarehousesEpic,
  setDefaultWarehouseEpic,
  setWarehouseStatusEpic,
  updateWarehouseEpic,
];