export async function rows(db, sql) {
  const { results } = await db.prepare(sql).all()
  return results
}
