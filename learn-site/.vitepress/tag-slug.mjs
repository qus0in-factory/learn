// One slug rule for tag chips and the /git/tags anchors.
export function tagSlug(tag) {
  return tag.trim().toLowerCase().replace(/[^\w가-힣.]+/g, '-').replace(/^-+|-+$/g, '')
}
