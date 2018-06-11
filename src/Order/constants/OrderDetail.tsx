import { AjaxRequest } from 'rxjs/ajax';

import { OrderAPI } from '@app/shared/constants/api';

import { AjaxRequestMethod } from '@app/shared/constants';

export const addRemarkRequest: AjaxRequest = {
    url: OrderAPI.AddRemark,
    method: AjaxRequestMethod.Post,
  };