import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';

import { AjaxRequestMethod } from '@app/shared/constants';
import { InventoryAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';

import {
  InventoryActionsUnion,
  InventoryActionTypes,
  LoadAllAction,
  LoadAllFail,
  LoadAllSuccess,
  
} from '../actions/inventory';

const loadAllRequest: AjaxRequest = {
  url: InventoryAPI.LoadAll,
  method: AjaxRequestMethod.Post,
};

export const loadInventoriesEpic = (action$: ActionsObservable<InventoryActionsUnion>): Observable<InventoryActionsUnion> =>
  action$.pipe(
    ofType(InventoryActionTypes.LoadAll),
    mergeMap((action: LoadAllAction) => 
      ajax({
          ...loadAllRequest,
          body: action.payload,
        }).pipe(
        map(response => response.response),
        map((inventories) => LoadAllSuccess(inventories)),
        catchError((err: AjaxError) => of(LoadAllFail(err.response))),
      )
    )
  );