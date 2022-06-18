import {
  healthCheckControllerContainer,
  HealthCheckControllerCradle,
} from '@/modules/health-check/application/health-check-controllers-container';

export type ControllersCradle = HealthCheckControllerCradle;

export const controllersContainer = {
  ...healthCheckControllerContainer,
};
