import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

export const havePermission =
  (routePermission: string) =>
  (request: Request, response: Response, next: NextFunction) => {
    const authToken = request.headers.authorization;

    if (!authToken) {
      throw new AppError("Token missing!", 401);
    }

    const permissions = request.permissions;

    if (checkPermissions(permissions, routePermission)) {
      next();
    } else {
      throw new AppError("Not authorized!", 401);
    }
  };

  async function checkPermissions(permissions: string[], routePermission: string): Promise<boolean> {
    if (permissions && permissions.includes(routePermission)) {
      return true;
    }
    return false;
  }
