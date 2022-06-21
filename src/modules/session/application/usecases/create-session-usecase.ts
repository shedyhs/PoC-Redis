import validator from 'validator';
import { DomainError } from '@/shared/domain/domain-error';
import { ICreateSessionDTO } from './dtos/create-session-dto';
import { IOutputSessionDTO } from './dtos/output-session-dto';
import { ICreateSessionUseCase } from './interfaces/create-session-usecase-interface';
import { IQueuePublisherGateway } from '@/shared/infra/gateways/queue-gateway/queue-publisher-gateway-interface';
import { IQueueSubscriberGateway } from '@/shared/infra/gateways/queue-gateway/queue-subscriber-gateway-interface';
import { IJobKeyGateway } from '@/shared/infra/gateways/job-key-gateway/job-key-gateway';

export class CreateSessionUseCase implements ICreateSessionUseCase {
  constructor(
    private readonly queuePublisherGateway: IQueuePublisherGateway,
    private readonly queueSubscriberGateway: IQueueSubscriberGateway,
    private readonly jobKeyGateway: IJobKeyGateway,
  ) {}
  async execute(input: ICreateSessionDTO): Promise<IOutputSessionDTO> {
    if (
      !validator.isEmail(input.email) ||
      !validator.isLength(input.password, { min: 6, max: 32 }) ||
      !validator.isLength(input.uToken, { min: 127, max: 127 })
    ) {
      throw new DomainError('Invalid input');
    }
    const jobKey = this.jobKeyGateway.generate();
    await this.queuePublisherGateway.publish({
      keyId: jobKey,
      queueName: 'create-session-email-password',
      payload: input,
    });
    const response = await this.queueSubscriberGateway.subscribe(jobKey);
    return {
      accessToken: response.accessToken,
      deviceToken: response.deviceToken,
      refreshToken: response.refreshToken,
      userId: response.userId,
    };
  }
}
