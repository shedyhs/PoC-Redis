/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IQueueSubscriberGateway {
  subscribe(queueName: string): Promise<any>;
}
