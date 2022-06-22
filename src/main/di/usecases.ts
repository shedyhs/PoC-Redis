import {
  sessionUseCaseContainer,
  SessionUseCaseCradle,
} from '@/modules/session/application/session-usecases-container';

/* eslint-disable @typescript-eslint/ban-types */
export type UseCasesCradle = SessionUseCaseCradle;

export const useCasesContainer = {
  ...sessionUseCaseContainer,
};
