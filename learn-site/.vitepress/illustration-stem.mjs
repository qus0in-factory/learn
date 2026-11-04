import config from './illustrations.json' with { type: 'json' }

// Illustration name -> asset stem (a few older figures keep their original stem).
export function illustrationStem(name) {
  return config.stems?.[name] ?? config.prefix + name
}
