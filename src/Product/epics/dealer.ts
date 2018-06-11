import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  DealerLevelActionsUnion,
  DealerLevelActionTypes,
  LoadAllSuccessAction,
} from '@app/Setting/actions/dealerLevel';
import { AjaxRequestMethod } from '@app/shared/constants';
import { DealerAPI } from '@app/shared/constants/api';
import { ErrorResponse, TableData } from '@app/shared/models';
import { ajax } from '@app/shared/utils';
import {
  LoadAllDealerFail,
  LoadAllDealerSuccess,
  ProductActionsUnion,
  ProductActionTypes,
  UpdateDealerLevelPriceList,
} from '../actions/product';
import { Dealer, DealerLevelPrice } from '../models';
import { mapToDealerLevelPriceList } from '../utils';

export const getDealerLevelPriceListEpic = (action$: ActionsObservable<DealerLevelActionsUnion>): Observable<ProductActionsUnion> =>
  action$.pipe(
    ofType(DealerLevelActionTypes.LoadAllSuccess),
    map((action: LoadAllSuccessAction) => mapToDealerLevelPriceList(action.payload)),
    map((dealerLevelPrice: DealerLevelPrice[]) => UpdateDealerLevelPriceList(dealerLevelPrice)),
  );

const loadDealersRequest: AjaxRequest = {
  url: DealerAPI.LoadAll,
  method: AjaxRequestMethod.Get,
};

export const loadDealersEpic = (action$: ActionsObservable<ProductActionsUnion>): Observable<ProductActionsUnion> =>
  action$.pipe(
    ofType(ProductActionTypes.LoadAllDealer),
    switchMap(() => 
      ajax({
        ...loadDealersRequest,
        body: { pageNo: 1, pageSize: 100 }
      }).pipe(
        map((response: AjaxResponse) => response.response),
        map((dealers: TableData<Dealer>) => LoadAllDealerSuccess(dealers.list)),
        catchError((err: ErrorResponse) => of(LoadAllDealerFail(err))),
      )
    )
  );