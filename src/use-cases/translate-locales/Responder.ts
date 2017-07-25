import { UseCaseResponder } from './../UseCase';


export interface Responder extends UseCaseResponder {
  localesTranslated(base: any, translated: any[]): void;
  cannotTranslateLocales(e: Error): void;
}
