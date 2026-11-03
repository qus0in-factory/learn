const LEGACY_PAGE =
  /^\/((?:0[1-9]|1[0-2])-[\w-]+|catalog|index|appendix\/\d{2}-[\w-]+|supplement\/\d{2}-[\w-]+)(?:\.html)?$/

export function legacyRedirect(pathname) {
  const match = pathname.match(LEGACY_PAGE)
  if (!match) return null
  return match[1] === 'index' ? '/git/' : `/git/${match[1]}`
}
