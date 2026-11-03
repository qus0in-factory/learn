import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { remoteDemo } from './remote-demo.mjs';
const scenarios = JSON.parse(readFileSync(new URL('./demo-steps.json', import.meta.url)));
export function demoOutput(git, topic, dir) {
  const scenario = scenarios[topic];
  if (!scenario) throw Error(`Unknown demo: ${topic}`);
  if (topic === '05') remoteDemo(git, dir);
  for (const [name, content] of Object.entries(scenario.files || {})) {
    writeFileSync(join(dir, name), content);
  }
  for (const step of scenario.steps) git(...step);
  return scenario.views.map(args => `$ git ${args.join(' ')}\n${git(...args)}`).join('\n');
}
