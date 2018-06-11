import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';

import { AjaxRequestMethod } from '@app/shared/constants';
import { WarehouseAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';
import {
  InOutDetailActionsUnion,
  InOutDetailActionTypes,
  SetInOutDetailAction,
  SetInOutDetailFail,
  SetInOutDetailSuccess,
} from '../actions/inOutDetail';


const setInOutDetailRequest: AjaxRequest = {
  url: WarehouseAPI.inOutDetail,
  method: AjaxRequestMethod.Get,
};

export const SetInOutDetailEpic = (action$: ActionsObservable<InOutDetailActionsUnion>): Observable<InOutDetailActionsUnion> =>
  action$.pipe(
    ofType(InOutDetailActionTypes.SetInOutDetail),
    mergeMap((action: SetInOutDetailAction) => 
      ajax({
          ...setInOutDetailRequest,
          url:setInOutDetailRequest.url+'/'+action.payload.stockId
        }).pipe(
        map(response => response.response),
        map((res) => SetInOutDetailSuccess(res)),
        catchError((err: AjaxError) => of(SetInOutDetailFail(err.response))),
      )
    )
  );