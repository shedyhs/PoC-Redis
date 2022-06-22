import {
  healthCheckControllerContainer,
  HealthCheckControllerCradle,
} from '@/modules/health-check/application/health-check-controllers-container';
import {
  SessionControllerCradle,
  sessionControllerContainer,
} from '@/modules/session/application/session-controllers-container';

export type ControllersCradle = HealthCheckControllerCradle &
  SessionControllerCradle;

export const controllersContainer = {
  ...healthCheckControllerContainer,
  ...sessionControllerContainer,
};
