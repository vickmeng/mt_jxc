import * as React from 'react';

import {
  ProducrtOnShelfModalContainer,
  ProductTableContainer,
  ProductToolbarContainer,
} from '../components';

export const ProductListView: React.SFC<{}> = () => (
  <>
    <h3>商品列表</h3>
    <ProductToolbarContainer />
    <ProductTableContainer />
    <ProducrtOnShelfModalContainer />
  </>
);