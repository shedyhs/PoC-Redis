import { BaseController } from '@/shared/application/base-controller';
import { RequiredFieldValidator } from '@/shared/application/validations/required-field-validator';
import { IValidator } from '@/shared/application/validations/validator-interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { ICreateSessionUseCase } from '../usecases/interfaces/create-session-usecase-interface';

export class CreateSessionController extends BaseController {
  constructor(private readonly createSessionUseCase: ICreateSessionUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;
    const response = await this.createSessionUseCase.execute({
      email,
      password,
    });
    return { data: response, statusCode: 201 };
  }

  buildValidators(request: HttpRequest): IValidator[] {
    return [
      new RequiredFieldValidator(request.body.email, 'email'),
      new RequiredFieldValidator(request.body.password, 'password'),
    ];
  }
}
