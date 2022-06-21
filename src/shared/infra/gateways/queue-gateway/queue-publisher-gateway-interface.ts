type IPublishMessage = {
  queueName: string;
  keyId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

export interface IQueuePublisherGateway {
  publish(input: IPublishMessage): Promise<void>;
}
