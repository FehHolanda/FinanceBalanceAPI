import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, ValidationError } from "yup";

type TProperty = "body" | "headers" | "params" | "query";

type TGetSchema = <T>(schema:ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TgetAllSchemas = (getSchema:TGetSchema) => Partial<TAllSchemas>;

type TValidator = (getAllSchemas:TgetAllSchemas) => RequestHandler;

export const Validator: TValidator = (schemas) => async (req, res, next) => {

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key,schema]) => {
        try {

            schema.validateSync(req[key as TProperty], { abortEarly: false });

        } catch (err) {
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (!error.path) return;
                errors[error.path] = error.message;
            });
            errorsResult[key] = errors;
        }

        if(Object.entries(errorsResult).length === 0){
            return next();
        }else{
            return res.status(StatusCodes.BAD_REQUEST).json({errors:errorsResult});
        }


    });

};