/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { RedisQueueClient } from '../../redis-client';

export class RedisQueueSubscriberGateway {
  private redisClient: RedisQueueClient = new RedisQueueClient();
  public async subscribe(queueName: string): Promise<any> {
    await this.redisClient.connect();
    let receivedValue;
    receivedValue = await this.redisClient.observeQueue(queueName);
    console.log('📨 Received message: \n', receivedValue);
    try {
      receivedValue = JSON.parse(receivedValue);
    } catch (error) {
      console.error('❌ Message cannot be parsed to JSON.\n', error);
    }
    await this.redisClient.disconnect();
    return receivedValue;
  }
}
