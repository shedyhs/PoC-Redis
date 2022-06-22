import { RedisQueueClient } from '../../redis-client';
import {
  IPublishMessage,
  IQueuePublisherGateway,
} from './queue-publisher-gateway-interface';

export class RedisQueuePublisherGateway implements IQueuePublisherGateway {
  redisClient = new RedisQueueClient();
  async publish(input: IPublishMessage): Promise<void> {
    await this.redisClient.connect();
    const payload = JSON.stringify({
      keyId: input.keyId,
      data: input.payload,
    });
    console.log('Transformando em string para o redis: \n', payload, '\n');
    await this.redisClient.add(input.queueName, payload);
    console.log(`Publiquei na chave ${input.queueName}`);
  }
}
