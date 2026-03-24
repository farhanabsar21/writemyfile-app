import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects, ZodObject } from "zod";

type SupportedSchema =
  | AnyZodObject
  | ZodObject<any>
  | ZodEffects<AnyZodObject>
  | ZodEffects<ZodObject<any>>;

type ValidateSchemas = {
  body?: SupportedSchema;
  params?: SupportedSchema;
  query?: SupportedSchema;
};

export const validate = (schemas: ValidateSchemas) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
