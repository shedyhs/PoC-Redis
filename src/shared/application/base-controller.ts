import fs from 'fs';
import { ApplicationErrors } from '@/shared/application/application-error';
import { DomainError } from '@/shared/domain/domain-error';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IValidator } from './validations/validator-interface';

export abstract class BaseController {
  abstract perform(request: HttpRequest): Promise<HttpResponse>;

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate(request);
      if (error) {
        return error;
      }
      const response = await this.perform(request);
      return response;
    } catch (error) {
      if (request.file && fs.existsSync(request.file.path)) {
        fs.unlinkSync(request.file.path);
      }
      const err = error as Error;
      switch (err.constructor) {
        case DomainError:
          return { data: { error: err.message }, statusCode: 400 };
        case ApplicationErrors.UnauthorizedError:
          return { data: { error: err.message }, statusCode: 401 };
        case ApplicationErrors.ForbiddenError:
          return { data: { error: err.message }, statusCode: 403 };
        case ApplicationErrors.NotFoundError:
          return { data: { error: err.message }, statusCode: 404 };
        case ApplicationErrors.RequestTimeout:
          return { data: { error: err.message }, statusCode: 408 };
        case ApplicationErrors.ConflictError:
          return { data: { error: err.message }, statusCode: 409 };
        default:
          // eslint-disable-next-line no-console
          console.error(err.message);
          return {
            data: { error: 'Internal Server Error', stack: err.stack },
            statusCode: 500,
          };
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildValidators(request: HttpRequest): IValidator[] {
    return [];
  }

  private validate(request: HttpRequest): HttpResponse | undefined {
    const validators = this.buildValidators(request);
    const errors: string[] = [];
    validators.forEach((validator) => {
      const error = validator.validate();
      if (error) {
        errors.push(error.message);
      }
    });
    if (errors.length > 0) {
      return { data: { errors }, statusCode: 400 };
    }
    return undefined;
  }
}
