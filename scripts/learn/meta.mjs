export function courseMeta(root) {
  const version = root.match(/(v[\d.]+)\/$/)?.[1]
  if (!version) throw new Error(`version not found in pdf root: ${root}`)
  return {
    title: 'Git과 웹 배포 강의',
    version,
    root,
    syncedAt: new Date().toISOString(),
  }
}
