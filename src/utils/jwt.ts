import jwt, { Secret } from "jsonwebtoken";
import { env } from "../config/env";

const ACCESS_TOKEN_EXPIRES = env.ACCESS_TOKEN_EXPIRES!;
const REFRESH_TOKEN_EXPIRES = env.REFRESH_TOKEN_EXPIRES!;

const JWT_ACCESS_SECRET: Secret = env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET: Secret = env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
};