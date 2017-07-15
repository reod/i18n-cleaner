export interface UseCaseCommand {}

export interface UseCaseResponder {}

export interface UseCase {
  execute(command: UseCaseCommand, responder: UseCaseResponder): void
}
