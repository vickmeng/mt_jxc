import * as React from 'react';

import {
  DealerLevelCreateModalContainer,
  DealerLevelsTableContainer,
  DealerLevelToolbarContainer,
  DealerLevelUpdateModalContainer,
} from '../components/DealerLevel';

export const DealerLevelSettingView: React.SFC<{}> = () => (
  <>
    <h3>经销商级别</h3>
    <DealerLevelToolbarContainer />
    <DealerLevelsTableContainer />
    <DealerLevelCreateModalContainer />
    <DealerLevelUpdateModalContainer />
  </>
);