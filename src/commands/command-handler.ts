import { Command } from './Command';
import { ListLocales } from './list-locales/ListLocales';


const noop = function() {};

const commands: Map<String, Command> = new Map();
commands.set('ListLocales', new ListLocales());

export function handleCommand(name: string ): Function {
  const executor = commands.get(name).execute || noop;
  return executor;
};
