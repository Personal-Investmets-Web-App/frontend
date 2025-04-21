export enum CORE_ERRORS {
  SERVER_ERROR = 'SERVER_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export enum CORE_CODE_ERRORS {
  SERVER_ERROR = 500,
  CLIENT_ERROR = 400,
}

export type ServerError = {
  type: CORE_ERRORS.SERVER_ERROR
  error: Error
  code: CORE_CODE_ERRORS.SERVER_ERROR
}

export type ClientError = {
  type: CORE_ERRORS.CLIENT_ERROR
  error: Error
  code: CORE_CODE_ERRORS.CLIENT_ERROR
}

export type ValidationError = {
  type: CORE_ERRORS.VALIDATION_ERROR
  error: Error
  code: number
}
