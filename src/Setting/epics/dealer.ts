import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { message } from 'antd';

import { AjaxRequestMethod } from '@app/shared/constants';
import { DealerAPI } from '@app/shared/constants/api';
import { ErrorResponse } from '@app/shared/models';
import { ajax } from '@app/shared/utils';

import {
  DealerActionsUnion,
  DealerActionTypes,
  LoadFail,
  LoadSuccess,
  UpdateAction,
  UpdateFail,
  UpdateSuccess,
} from '../actions/dealer';
import { Dealer } from '../models';

const loadRequest: AjaxRequest = {
  url: DealerAPI.Base,
  method: AjaxRequestMethod.Get,
};

export const loadDealerEpic = (action$: ActionsObservable<DealerActionsUnion>): Observable<DealerActionsUnion> =>
  action$.pipe(
    ofType(DealerActionTypes.Load),
    switchMap(() =>
      ajax(loadRequest).pipe(
        map((response: AjaxResponse) => response.response),
        map((dealer: Dealer) => LoadSuccess(dealer)),
        catchError((err: ErrorResponse) => of(LoadFail(err))),
      )
    )
  );

const updateRequest: AjaxRequest = {
  url: DealerAPI.Base,
  method: AjaxRequestMethod.Put,
};

export const updateDealerpic = (action$: ActionsObservable<DealerActionsUnion>): Observable<DealerActionsUnion> =>
  action$.pipe(
    ofType(DealerActionTypes.Update),
    mergeMap((action: UpdateAction) => 
      ajax({
        ...updateRequest,
        body: action.payload,
      }).pipe(
        map((response: AjaxResponse) => response.response),
        map(() => {
          message.success('名称设置成功');
          return UpdateSuccess();
        }),
        catchError((err: ErrorResponse) => of(UpdateFail(err))),
      )
    )
  );