import { go } from 'react-router-redux'

import { ActionsObservable, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { AjaxError, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, mergeMap, } from 'rxjs/operators';

import { message } from 'antd';

import { AjaxRequestMethod } from '@app/shared/constants';
import { WarehouseAPI } from '@app/shared/constants/api';
import { ajax } from '@app/shared/utils';
import { store } from 'index'
import {
  CreateInOutAction,
  CreateInOutActionsUnion,
  CreateInOutActionTypes,
  CreateInOutFail,
  CreateInOutSuccess
} from '../actions/createInOut';


const createInOutRequest: AjaxRequest = {
  url: WarehouseAPI.createInOut,
  method: AjaxRequestMethod.Post,
};




export const CreateInOutEpic = (action$: ActionsObservable<CreateInOutActionsUnion>): Observable<CreateInOutActionsUnion> =>
  action$.pipe(
    ofType(CreateInOutActionTypes.CreateInOut),
    mergeMap((action: CreateInOutAction) => 
      ajax({
          ...createInOutRequest,
          body: action.payload,
        }).pipe(
        map(response => response.response),
        map(() => {
          message.success('创建成功');
          store.dispatch(go(-1));
          return CreateInOutSuccess();
        }),
        catchError((err: AjaxError) => of(CreateInOutFail(err.response))),
      )
    )
  );