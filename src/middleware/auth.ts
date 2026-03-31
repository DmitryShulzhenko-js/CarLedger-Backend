import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  console.log('попало в auth.ts authMiddleware')

  console.log('req.headers.authorization: ',  req.headers.authorization)

  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch {
    res.sendStatus(403);
  }
};
