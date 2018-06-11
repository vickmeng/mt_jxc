import * as React from 'react';

import {
  UnitCreateModalContainer,
  UnitTableContainer,
  UnitToolbarContainer,
  UnitUpdateModalContainer,
} from '../components/Unit';

export const UnitSettingView: React.SFC<{}> = () => (
  <>
    <h3>计量单位</h3>
    <UnitToolbarContainer />
    <UnitTableContainer />
    <UnitCreateModalContainer />
    <UnitUpdateModalContainer />
  </>
);