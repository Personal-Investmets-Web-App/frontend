import { z } from "zod";

export enum REGISTER_METHOD {
  GOOGLE = 'google',
  EMAIL = 'email',
}

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  EDITOR = 'editor',
}

export const UserSchema = z.object({
  id: z.number(),
  role: z.nativeEnum(ROLE),

  email: z.string().email(),
  name: z.string(),
  lastName: z.string(),
  registerMethod: z.nativeEnum(REGISTER_METHOD),

  profilePic: z.string().nullable(),
});
export type User = z.infer<typeof UserSchema>;

export const UserJwtSchema = UserSchema.omit({
  profilePic: true,
});
export type UserJwt = z.infer<typeof UserJwtSchema>;

export const UserAndTokensSchema = z.object({
  user: UserJwtSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type UserAndTokensDto = z.infer<typeof UserAndTokensSchema>;

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required.",
  }).email({
    message: "Invalid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});
export type LoginDto = z.infer<typeof LoginSchema>;