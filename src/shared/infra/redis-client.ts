import Bull from 'bull';

export class RedisQueue {
  constructor() {}
  async publish<T>(
    queueName: string,
    keyId: string,
    payload: T,
  ): Promise<void> {
    const queue = Bull<T>(queueName, {
      redis: {
        host: process.env.REDIS_HOST ?? '127.0.0.1',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    });
    await queue.add({ ...payload, keyId });
    queue.close();
  }

  async publishAndWait<T>(
    queueName: string,
    keyId: string,
    payload: T,
  ): Promise<any> {
    const queue = Bull<T>(queueName, {
      redis: {
        host: process.env.REDIS_HOST ?? '127.0.0.1',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    });
    await queue.add({ ...payload, keyId });
    let jobResponse;
    do {
      jobResponse = await queue.getJob(keyId);
      if (jobResponse) {
        break;
        2;
      }
    } while (true);
    queue.close();
  }
}
