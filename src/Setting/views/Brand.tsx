import * as React from 'react';

import {
  BrandCreateModalContainer,
  BrandTableContainer,
  BrandToolbarContainer,
  BrandUpdateModalContainer,
} from '../components/Brand';

export const BrandSettingView: React.SFC<{}> = () => (
  <>
    <h3>商品品牌</h3>
    <BrandToolbarContainer />
    <BrandTableContainer />
    <BrandCreateModalContainer />
    <BrandUpdateModalContainer />
  </>
);