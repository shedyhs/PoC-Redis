import * as awilix from 'awilix';
import { HealthCheckController } from './controllers/health-check-controller';

export type HealthCheckControllerCradle = {
  healthCheckController: HealthCheckController;
};

export const healthCheckControllerContainer = {
  healthCheckController: awilix.asClass(HealthCheckController).singleton(),
};
