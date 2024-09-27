import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
  groups: any;
  institution: any;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.userAuthenticated = Number(user_id);

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
