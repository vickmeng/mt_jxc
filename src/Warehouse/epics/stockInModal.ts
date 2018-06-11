import { push } from 'react-router-redux'

import { ActionsObservable, ofType,StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';


import { message } from 'antd';

import { State } from '@app/root';
import { AjaxRequestMethod } from '@app/shared/constants';
import { WarehouseAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';
import * as utils from 'shared/utils';

import { store } from 'index'

import * as fromWarehouse from '../reducers';


import {
  StockInAction,
  StockInActionsUnion,
  StockInActionTypes,
  StockInFail,
  StockInSuccess
} from '../actions/stockInModal';

import {
  LoadAll
} from '../actions/transfer';

const stockInRequest: AjaxRequest = {
  url: WarehouseAPI.stockIn,
  method: AjaxRequestMethod.Put,
};

export const StockInEpic = (action$: ActionsObservable<StockInActionsUnion>,state$:StateObservable<State>): Observable<StockInActionsUnion> =>
  action$.pipe(
    ofType(StockInActionTypes.StockIn),
    mergeMap((action: StockInAction) => 
      ajax({
          ...stockInRequest,
          body: action.payload,
        }).pipe(
        map(response => response.response),
        mergeMap(() => {
          message.success('入库成功');

          if((state$ as any).value.router.location.pathname === '/warehouse/transfer'){
            const params = {
              ...utils.formatTimeRange(fromWarehouse.getTransferTimeRangeState(state$.value)),
              ...utils.getPaginationParams(fromWarehouse.getTransferTableDataState(state$.value)),
              ...fromWarehouse.getTransferQueryParams(state$.value),
            };
            return of(StockInSuccess(), LoadAll(params))
          }else {
            store.dispatch(push('/warehouse/transfer'));
            return of(StockInSuccess())
          }
        }),
        
        catchError((err: AjaxError) => of(StockInFail(err.response))),
      )
    )
  );