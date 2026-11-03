import { readFileSync } from 'node:fs';
const scenarios = JSON.parse(readFileSync(new URL('./demo-steps.json', import.meta.url)));
export function demoOutput(git, topic) {
  const scenario = scenarios[topic];
  if (!scenario) throw Error(`Unknown demo: ${topic}`);
  for (const step of scenario.steps) git(...step);
  return scenario.views.map(args => `$ git ${args.join(' ')}\n${git(...args)}`).join('\n');
}
