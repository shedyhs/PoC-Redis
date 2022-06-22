import { IQueuePublisherGateway } from '@/shared/infra/gateways/queue-gateway/queue-publisher-gateway-interface';
import { IQueueSubscriberGateway } from '@/shared/infra/gateways/queue-gateway/queue-subscriber-gateway-interface';
import { RedisQueuePublisherGateway } from '../shared/infra/gateways/queue-gateway/redis-queue-publisher-gateway';
import { RedisQueueSubscriberGateway } from '../shared/infra/gateways/queue-gateway/redis-queue-subscriber-gateway';

class SampleWorker {
  private workerName = 'create-session-email-password';
  constructor(
    private readonly queuePublisherGateway: IQueuePublisherGateway,
    private readonly queueSubscriberGateway: IQueueSubscriberGateway,
  ) {}

  async execute() {
    const received = await this.queueSubscriberGateway.subscribe(
      this.workerName,
    );
    console.log('received :', received);
    const { keyId, data } = received;
    console.log(`Worker recebeu o job com a keyId ${keyId}\n${data}`);
    await this.queuePublisherGateway.publish({
      keyId: 'invalid',
      queueName: keyId,
      payload: {
        data: {
          accessToken: 'accessTokenValue',
          refreshToken: 'refreshTokenValue',
          deviceToken: 'deviceTokenValue',
          userId: 'uuid-of-user',
        },
      },
    });
  }
}
const redisQueuePublisherGateway = new RedisQueuePublisherGateway();
const redisQueueSubscriberGateway = new RedisQueueSubscriberGateway();
const worker = new SampleWorker(
  redisQueuePublisherGateway,
  redisQueueSubscriberGateway,
);
worker.execute();
