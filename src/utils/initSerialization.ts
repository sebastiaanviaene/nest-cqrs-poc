/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  CallHandler,
  ClassSerializerContextOptions,
  ClassSerializerInterceptor,
  ExecutionContext,
  INestApplication,
  Injectable,
  PlainLiteralObject,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import 'reflect-metadata';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

const validationTransformationOptions = {
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  whitelist: true,
  forbidUnknownValues: false,
};
export const initValidation = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      ...validationTransformationOptions,
      exceptionFactory: (errors) => {
        const result = errors.reduce(mapErrors, {});
        return new BadRequestException({
          reason: 'ValidationError',
          errors: result,
          message: 'Some fields have errors',
        });
      },
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));
};

@Injectable()
export class TransformInterceptor extends ClassSerializerInterceptor {
  override intercept(context: ExecutionContext, next: CallHandler): any {
    const handlerFunc = context.getHandler();
    const responseMetadata = Reflect.getMetadata(
      'swagger/apiResponse', // TODO: fix with additional plugin, swagger doesn't really match the needs here https://panenco.youtrack.cloud/agiles/121-64/current?issue=CUREWIKI-121
      handlerFunc,
    );
    const responseType =
      responseMetadata &&
      (Object.values(responseMetadata)?.find((m: any) => m.type) as any)?.type;
    const o: any = this.defaultOptions;
    o.type = responseType;
    Object.assign(o, validationTransformationOptions);

    return super.intercept(context, next);
  }

  override async serialize(
    response: PlainLiteralObject | Array<PlainLiteralObject>,
    options: ClassSerializerContextOptions,
  ): Promise<PlainLiteralObject | Array<PlainLiteralObject>> {
    const instance = options.type
      ? plainToInstance(options.type, response, options)
      : response;
    const responseErrors =
      instance && (await validate(instance, validationTransformationOptions));
    if (responseErrors?.length) {
      console.warn(
        `Response view validation errors: ${options.type?.name} has ${
          responseErrors.length
        } errors in ${responseErrors.map((e: any) => e.property).join(', ')}`,
      );
      if (process.env['VERBOSE']) {
        console.warn(JSON.stringify({ responseErrors }, null, 2));
      }
    }

    return super.serialize(instance, options);
  }
}

const reduceErrors = (errors: ValidationError[]) => {
  return errors.reduce(mapErrors, {});
};

const mapErrors = (m: any, error: ValidationError) => {
  m[error.property] = error.constraints
    ? Object.values(error.constraints)
    : reduceErrors(error.children as ValidationError[]);
  return m;
};
