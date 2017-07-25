import { UseCaseResponder } from './../UseCase';


export interface Responder extends UseCaseResponder {
  localesFound(locales: string[]): void;
  cannotGetLocales(error: Error): void;
}
