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
  CreateTransferAction,
  CreateTransferActionsUnion,
  CreateTransferActionTypes,
  CreateTransferFail,
  CreateTransferSuccess,
} from '../actions/createTransfer';


const createTransferRequest: AjaxRequest = {
  url: WarehouseAPI.createTransfer,
  method: AjaxRequestMethod.Post,
};

export const CreateTransferEpic = (action$: ActionsObservable<CreateTransferActionsUnion>): Observable<CreateTransferActionsUnion> =>
  action$.pipe(
    ofType(CreateTransferActionTypes.CreateTransfer),
    mergeMap((action: CreateTransferAction) => 
      ajax({
          ...createTransferRequest,
          body: action.payload,
        }).pipe(
        map(response => response.response),
        map(() => {
          message.success('创建成功');
          store.dispatch(go(-1));
          return CreateTransferSuccess();
        }),
        catchError((err: AjaxError) => of(CreateTransferFail(err.response))),
      )
    )
  );