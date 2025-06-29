import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler =
  (requestHandler: AsyncHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };

export { asyncHandler };