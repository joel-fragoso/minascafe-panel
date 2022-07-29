import { AxiosError } from 'axios';

export enum HttpMessage {
  Ok = 'OK',
  BadRequest = 'BAD_REQUEST',
  Unauthorized = 'UNAUTHORIZED',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  ServerError = 'SERVER_ERROR',
}

export enum HttpStatusCode {
  Ok = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
}

export enum ServerMessage {
  IntegrityConstraintViolation = 'INTEGRITY_CONSTRAINT_VIOLATION',
  NumberValueOutOfRange = 'NUMBER_VALUE_OUT_OF_RANGE',
}

export enum ServerStatusCode {
  IntegrityConstraintViolation = 1451,
  NumberValueOutOfRange = 1264,
  DataTooLong = 1406,
}

interface IAxiosErrorHandler {
  type: HttpMessage;
  response: unknown;
}

type ErrorMessage = {
  error: string;
};

type ServerErrorMessage = {
  error: {
    code: number;
    message: string;
  };
};

export function isErrorMessage(value: unknown): value is ErrorMessage {
  return typeof value === 'object' && Object.hasOwn(value as object, 'error');
}

export function isServerErrorMessage(
  value: unknown,
): value is ServerErrorMessage {
  return typeof value === 'object' && Object.hasOwn(value as object, 'error');
}

export function axiosErrorHandler(error: AxiosError): IAxiosErrorHandler {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    if (error.response.status === HttpStatusCode.Unauthorized) {
      return {
        type: HttpMessage.Unauthorized,
        response: error.response.data,
      };
    }

    if (error.response.status === HttpStatusCode.ServerError) {
      if (isServerErrorMessage(error.response.data)) {
        return {
          type: HttpMessage.ServerError,
          response: error.response.data,
        };
      }
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log(error.request);
    return { type: HttpMessage.ServerError, response: error.request };
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('Error', error.message);
    return { type: HttpMessage.BadRequest, response: error.message };
  }
  // console.log(error.config);
  return { type: HttpMessage.BadRequest, response: error.config };
}
