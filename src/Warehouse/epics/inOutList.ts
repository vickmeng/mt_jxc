import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';

import { AjaxRequestMethod } from '@app/shared/constants';
import { WarehouseAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';

import {
  InOutListActionsUnion,
  InOutListActionTypes,
  LoadAllAction,
  LoadAllFail,
  LoadAllSuccess,
} from '../actions/inOutList';


const loadAllRequest: AjaxRequest = {
  url: WarehouseAPI.InOutList,
  method: AjaxRequestMethod.Post,
};




export const loadTableDataEpic = (action$: ActionsObservable<InOutListActionsUnion>): Observable<InOutListActionsUnion> =>
  action$.pipe(
    ofType(InOutListActionTypes.LoadAll),
    mergeMap((action: LoadAllAction) => 
      ajax({
          ...loadAllRequest,
          body: action.payload,
        }).pipe(
        map(response => response.response),
        map((Columns) => LoadAllSuccess(Columns)),
        catchError((err: AjaxError) => of(LoadAllFail(err.response))),
      )
    )
  );