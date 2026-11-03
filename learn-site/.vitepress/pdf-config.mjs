export function validateConfig(value) {
  const { baseUrl, version, revision } = value ?? {}
  if (typeof baseUrl !== 'string' || !/^https:\/\/.+\/$/.test(baseUrl)) {
    throw new Error('invalid pdf baseUrl')
  }
  if (!/^v\d+\.\d+\.\d+$/.test(version ?? '')) throw new Error('invalid pdf version')
  if (!/^[0-9a-f]{7,40}$/.test(revision ?? '')) throw new Error('invalid pdf revision')
  return { baseUrl, version, revision }
}
