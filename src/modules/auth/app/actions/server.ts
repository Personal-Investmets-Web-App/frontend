'use server'

import { env } from "@/env/client"
import { errAsync, okAsync, ResultAsync, Result } from 'neverthrow';
import { AUTH_CODE_ERRORS, AUTH_ERRORS, BadCredentialsError, LocalLoginError } from "../../infra/auth.errors";
import { ClientError, CORE_CODE_ERRORS, CORE_ERRORS, ServerError } from "@/core/infra/core.errors";
import { LoginDto, UserAndTokensDto, UserAndTokensSchema } from "../../infra/auth.models";

export const localLogin = async (
  loginDto: LoginDto
): Promise<Result<UserAndTokensDto, LocalLoginError>> => {

  const result = await ResultAsync.fromPromise(
    fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginDto),
    }),
    (e) => {
      return e instanceof Error ? e : new Error(String(e));
    }
  )

  if (result.isErr()) {
    console.error('localLogin error', result.error)
    const serverError: ServerError = {
      type: CORE_ERRORS.SERVER_ERROR,
      error: new Error("The server is presenting an unexpected error, talk to support"),
      code: CORE_CODE_ERRORS.SERVER_ERROR
    }
    return errAsync(serverError)
  }

  if (result.value.status === 400) {
    const badCredentialsError: BadCredentialsError = {
      type: AUTH_ERRORS.BAD_CREDENTIALS,
      error: new Error("Invalid credentials"),
      code: AUTH_CODE_ERRORS.BAD_CREDENTIALS,
    };
    return errAsync(badCredentialsError)
  }

  if (result.value.status === 500) {
    const serverError: ServerError = {
      type: CORE_ERRORS.SERVER_ERROR,
      error: new Error("The server is presenting an unexpected error, talk to support"),
      code: CORE_CODE_ERRORS.SERVER_ERROR,
    }
    return errAsync(serverError)
  }

  const jsonResult = await ResultAsync.fromPromise(
    result.value.json(),
    (e) => {
      return e instanceof Error ? e : new Error(String(e));
    }
  )

  if (jsonResult.isErr()) {
    console.error('localLogin error', jsonResult.error)
    const clientError: ClientError = {
      type: CORE_ERRORS.CLIENT_ERROR,
      error: new Error("The client is presenting an unexpected error, talk to support"),
      code: CORE_CODE_ERRORS.CLIENT_ERROR,
    }
    return errAsync(clientError)
  }

  const userAndTokens = UserAndTokensSchema.safeParse(jsonResult.value)

  if (userAndTokens.error) {
    console.error('localLogin error', userAndTokens.error)
    const clientError: ClientError = {
      type: CORE_ERRORS.CLIENT_ERROR,
      error: new Error("Validation of login return schema error"),
      code: CORE_CODE_ERRORS.CLIENT_ERROR,
    }
    return errAsync(clientError)
  }

  return okAsync(userAndTokens.data)
}