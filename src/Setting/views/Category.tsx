import * as React from 'react';

import {
  CategoryCreateModalContainer,
  CategoryTableContainer,
  CategoryToolbarContainer,
  CategoryUpdateModalContainer,
} from '../components/Category';

export const CategorySettingView: React.SFC<{}> = () => (
  <>
    <h3>商品分类</h3>
    <CategoryToolbarContainer />
    <CategoryTableContainer />
    <CategoryCreateModalContainer />
    <CategoryUpdateModalContainer />
  </>
);