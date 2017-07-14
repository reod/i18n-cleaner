import { Command } from './Command';
import { ListLocales } from './list-locales/ListLocales';


export interface CommandHandler {
  (name: string): Function
};

export function emptyExecutor(): void {
  console.log('No executor found.');
};

const commands: Map<String, Command> = new Map([
  ['ListLocales', new ListLocales()]
]);

export const handleCommand: CommandHandler = function (name: string): Function {
  const command: Command = commands.get(name);
  return command ? command.execute : emptyExecutor;
};
