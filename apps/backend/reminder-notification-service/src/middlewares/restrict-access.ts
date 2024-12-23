import { NextFunction, Request, Response } from "express";

function Access(req: Request, _res: Response, next: NextFunction) {
  if (!req.headers["x-proxy-header"]) {
    req.headers["x-proxy-header"] = "my-secret-key"; // You can set this to whatever default value you need
  }
  next();
}

export default Access;
