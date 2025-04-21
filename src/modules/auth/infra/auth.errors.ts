import { ClientError, ServerError } from "@/core/infra/core.errors"

export enum AUTH_ERRORS {
  BAD_CREDENTIALS = 'BAD_CREDENTIALS',
}

export enum AUTH_CODE_ERRORS {
  BAD_CREDENTIALS = 400,
}

export type BadCredentialsError = {
  type: AUTH_ERRORS.BAD_CREDENTIALS
  error: Error
  code: AUTH_CODE_ERRORS.BAD_CREDENTIALS
}

export type LocalLoginError = BadCredentialsError | ServerError | ClientError
