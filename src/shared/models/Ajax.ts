export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
  requestId: string;
  resource: string;
}

export interface RequestBody {
  [propName: string]: any;
}