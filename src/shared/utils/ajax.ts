import { Observable, throwError } from 'rxjs';
import { ajax as ajaxObservable, AjaxError, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

import { message } from 'antd';

import { AjaxRequestMethod, AjaxResponseType, host } from '@app/shared/constants';
import { ErrorResponse, RequestBody } from '@app/shared/models';

export const defaultRequest: AjaxRequest = {
  responseType: AjaxResponseType.JSON,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'x-app-id': 'xcrm-web',
    'Authorization': '1rU9IRSJwk4MS7rk-c',
  },
  crossDomain: true,
  async: true,
};

const serialize = (body: RequestBody): string => {
  return Object.keys(body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');
}

export const ajax = (request: AjaxRequest): Observable<AjaxResponse> => {
  const completeRequest = {
    ...defaultRequest,
    ...request,
    url: `${host}${request.url}`,
  };

  if (request.method === AjaxRequestMethod.Get) {
    if (typeof completeRequest.body !== 'undefined') {
      completeRequest.url += `?${serialize(completeRequest.body)}`;
      delete completeRequest.body;
    }
  }

  return ajaxObservable(completeRequest).pipe(
    catchError((err: AjaxError) => {
      if (err.status === 401) {
        // TODO: 跳转至登录页
      }
      const errResponse: ErrorResponse = err.response;
      message.error(errResponse.errorMessage);
      return throwError(errResponse);
    })
  );
};