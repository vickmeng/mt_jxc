import {
  DealerLevelActionsUnion,
  DealerLevelActionTypes,
  LoadAllSuccessAction,
} from '../../actions/dealerLevel';
import { DealerLevel } from '../../models';

export interface State {
  loaded: boolean;
  loading: boolean;
  entities: DealerLevel[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  entities: [],
};

export const reducer = (
  state: State = initialState,
  action: DealerLevelActionsUnion,
): State => {
  switch (action.type) {

    case DealerLevelActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
      };
    
    case DealerLevelActionTypes.LoadAllSuccess:
      return {
        loaded: true,
        loading: false,
        entities: (action as LoadAllSuccessAction).payload,
      };
    
    case DealerLevelActionTypes.LoadAllFail:
      return {
        ...state,
        loading: false,
      };

    case DealerLevelActionTypes.Delete:
      return {
        ...state,
        loading: true,
      };

    case DealerLevelActionTypes.DeleteSuccess:
    case DealerLevelActionTypes.DeleteFail:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export const getLoaded = (state: State): boolean => state.loaded;

export const getLoading = (state: State): boolean => state.loading;

export const getDealerLevels = (state: State): DealerLevel[] => state.entities;
