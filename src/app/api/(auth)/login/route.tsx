import { CORE_CODE_ERRORS, CORE_ERRORS } from "@/core/infra/core.errors";
import { localLogin } from "@/modules/auth/app/actions/server";
import { LoginSchema } from "@/modules/auth/infra/auth.models";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const loginDto = LoginSchema.safeParse(await request.json())

  if (loginDto.error) {
    return NextResponse.json(
      {
        type: CORE_ERRORS.VALIDATION_ERROR,
        message: "Invalid login data"
      }, 
      { status: CORE_CODE_ERRORS.CLIENT_ERROR }
    )
  }

  const loginResult = await localLogin(loginDto.data)

  if (loginResult.isErr()) {
    console.error("localLogin error", loginResult.error)
    return NextResponse.json(
      { 
        type: loginResult.error.type,
        message: loginResult.error.error.message 
      }, 
      { status: loginResult.error.code }
    )
  }

  const { user, accessToken, refreshToken } = loginResult.value

  cookieStore.set("refreshToken", refreshToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
  
  return NextResponse.json({ user, accessToken }, { status: 200 })
}