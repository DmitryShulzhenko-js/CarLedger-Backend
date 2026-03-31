import express from "express";
import type { Request, Response, NextFunction } from "express";
import axios from "axios";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import session from "express-session";
import bcrypt from "bcryptjs";
import cors from "cors";
import jwt from "jsonwebtoken";
import { env } from './config/env';
import { Users } from "./models/Users";
import { login, refreshToken, registration, logout } from "./routes/auth";
import { test } from "./routes/test";
import { authMiddleware } from "./middleware/auth";

const { Sequelize } = require("sequelize");

const app = express();

const PORT = env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    origin: "http://localhost:5173", // FRONTEND
    credentials: true, // чтобы куки передавались
  }),
);

app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true только если https
      maxAge: 1000 * 60 * 60, // 1 час
    },
  }),
);

app.get('/refreshToken', refreshToken);
app.post('/login', login);
app.get('/registration', registration);
app.get('/logout', logout);
app.get('/test', authMiddleware, test);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
