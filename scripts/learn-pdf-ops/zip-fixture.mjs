import { writeFileSync, mkdirSync } from 'node:fs';
export function zipCommands(bytes, commands) {
  return (command, args) => {
    commands.push(command);
    if (command === 'curl') writeFileSync(args.at(-1), bytes);
    else if (command === 'unzip') mkdirSync(args.at(-1));
    else throw Error('Unexpected external command');
  };
}
