import { RedisClientType } from '@redis/client';
import * as redis from 'redis';
import { ApplicationErrors } from '../application/application-error';

export class RedisQueueClient {
  private client: RedisClientType;
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_URL,
    });
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      console.log('Conectando no redis...');
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (!this.client.isOpen) {
      console.log('Disconectando do redis...');
      await this.client.disconnect();
    }
  }

  async add(key: string, value: string): Promise<void> {
    await this.client.rPush(key, value);
  }

  async get(key: string): Promise<string | undefined> {
    const foundValue = await this.client.get(key);
    console.log(`A chave ${key} tem o valor de ${foundValue as string}`);
    if (!foundValue) {
      return undefined;
    }
    return foundValue;
  }

  async observeQueue(key: string): Promise<string> {
    const timeoutInSeconds = 0;
    console.log(`Observando chave ${key}`);
    const receivedValue = await this.client.blPop(key, timeoutInSeconds);
    if (receivedValue === null) {
      throw new ApplicationErrors.RequestTimeout('Timeout on queue');
    }
    return receivedValue.element;
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
