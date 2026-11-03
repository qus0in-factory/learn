import { registerHooks } from 'node:module';
export function moduleMocks(sources) {
  return registerHooks({
    load(url, context, next) {
      if (sources[url] !== undefined) {
        return { format: 'module', source: sources[url], shortCircuit: true };
      }
      return next(url, context);
    },
  });
}
export function reexportMocks(names, fixture, directory) {
  return moduleMocks(Object.fromEntries(names.map(name =>
    [new URL(name, directory).href, `export * from '${fixture}';`])));
}
