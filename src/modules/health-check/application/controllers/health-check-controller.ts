import { BaseController } from '@/shared/application/base-controller';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';

export class HealthCheckController extends BaseController {
  async perform(_request: HttpRequest): Promise<HttpResponse> {
    return { data: undefined, statusCode: 200 };
  }
}
