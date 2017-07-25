import { UseCaseResponder } from './../UseCase';
export interface Responder extends UseCaseResponder {
    localesFound(locales: Array<String>): void;
    cannotGetLocales(error: Error): void;
}
