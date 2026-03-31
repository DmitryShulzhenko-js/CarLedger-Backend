import bcrypt from "bcryptjs";
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt";
import type { Request, Response, NextFunction } from "express";
import { Users } from "../models/Users";
import { RefreshTokens } from "../models/RefreshTokens";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log("username: ", username);
  console.log("password: ", password);

  const user = await Users.findOne({ where: { username } });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Сохраняем refresh токен в БД
  try {
    await RefreshTokens.create({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  } catch (err: any) {
    console.error("FULL ERROR:", err); // весь объект
    console.error("MESSAGE:", err.message); // текст ошибки
    console.error("DETAILS:", err.parent); // SQL ошибка от Postgres
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: true
  });

  return res.json({ accessToken });
};


export const refreshToken = async (req: Request, res: Response) => {
  // 🔥 берём из cookie, а не из body
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  // проверяем в БД
  const stored = await RefreshTokens.findOne({ where: { token } });

  if (!stored) {
    return res.status(403).json({ message: "Token not found" });
  }

  try {
    const payload: any = verifyRefreshToken(token);
    const userId = payload.userId;

    // 🔥 ROTATION (удаляем старый токен)
    await stored.destroy();

    const newAccessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);

    // сохраняем новый refresh
    await RefreshTokens.create({
      userId,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // 🔥 кладём в cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // localhost
      sameSite: "strict",
    });

    // ❗ возвращаем ТОЛЬКО access token
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const registration = async (req: Request, res: Response) => {
  const user = await Users.findOne({ where: { username: "user1" } });

  res.json({ message: "success", data: user });
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (token) {
    await RefreshTokens.destroy({ where: { token } });
  }

  // 🔥 очищаем cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, // localhost
    sameSite: "strict",
  });

  return res.sendStatus(204);
};




