import * as awilix from 'awilix';
import { CreateSessionUseCase } from './usecases/create-session-usecase';
import { ICreateSessionUseCase } from './usecases/interfaces/create-session-usecase-interface';

export type SessionUseCaseCradle = {
  createSessionUseCase: ICreateSessionUseCase;
};

export const sessionUseCaseContainer = {
  createSessionUseCase: awilix.asClass(CreateSessionUseCase).singleton(),
};
