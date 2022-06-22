/* eslint-disable @typescript-eslint/no-explicit-any */
export type IPublishMessage = {
  queueName: string;
  keyId: string;
  payload: any;
};

export interface IQueuePublisherGateway {
  publish(input: IPublishMessage): Promise<void>;
}
