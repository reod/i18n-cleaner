import { UseCaseResponder } from './../UseCase';

export interface Responder extends UseCaseResponder {
  localesCleaned(): void
  cannotGetLocales(error: Error): void,
  cannotSaveLocales(error: Error): void
}
  