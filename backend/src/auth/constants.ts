import { CookieOptions } from 'express';
import 'dotenv/config';

export const refreshTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: Number(process.env.REFRESH_TOKENT_EXPIRATION_TIME_MS),
};
