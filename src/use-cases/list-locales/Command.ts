import { UseCaseCommand } from './../UseCase';


export class Command implements UseCaseCommand {
  constructor(public path: string) {}
}
