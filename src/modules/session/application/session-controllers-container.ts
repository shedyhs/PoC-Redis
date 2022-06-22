import * as awilix from 'awilix';
import { CreateSessionController } from './controller/create-session-controller';

export type SessionControllerCradle = {
  createSessionController: CreateSessionController;
};

export const sessionControllerContainer = {
  createSessionController: awilix.asClass(CreateSessionController).singleton(),
};
