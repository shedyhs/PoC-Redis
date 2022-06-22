/* eslint-disable @typescript-eslint/ban-types */
import * as awilix from 'awilix';
import { IQueuePublisherGateway } from '@/shared/infra/gateways/queue-gateway/queue-publisher-gateway-interface';
import { IQueueSubscriberGateway } from '@/shared/infra/gateways/queue-gateway/queue-subscriber-gateway-interface';
import { IJobKeyGateway } from '@/shared/infra/gateways/job-key-gateway/job-key-gateway-interface';
import { RedisQueuePublisherGateway } from '@/shared/infra/gateways/queue-gateway/redis-queue-publisher-gateway';
import { RedisQueueSubscriberGateway } from '@/shared/infra/gateways/queue-gateway/redis-queue-subscriber-gateway';
import { JobKeyGateway } from '@/shared/infra/gateways/job-key-gateway/job-key-gateway';

export type ThirdPartiesCradle = {
  queuePublisherGateway: IQueuePublisherGateway;
  queueSubscriberGateway: IQueueSubscriberGateway;
  jobKeyGateway: IJobKeyGateway;
};

export const thirdPartiesContainer = {
  queuePublisherGateway: awilix.asClass(RedisQueuePublisherGateway).singleton(),
  queueSubscriberGateway: awilix
    .asClass(RedisQueueSubscriberGateway)
    .singleton(),
  jobKeyGateway: awilix.asClass(JobKeyGateway).singleton(),
};
