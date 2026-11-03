const quote = (value) => {
  if (value == null) return 'NULL'
  if (typeof value === 'number') return String(value)
  return `'${String(value).replaceAll("'", "''")}'`
}

export const rows = (list) =>
  list.map((row) => `(${row.map(quote).join(',')})`).join(',\n')

export const insert = (table, columns, values) =>
  `INSERT INTO ${table} (${columns}) VALUES\n${rows(values)};`

export const insertUnlessActive = (table, columns, values, version) =>
  `INSERT INTO ${table} (${columns}) SELECT * FROM (VALUES\n${rows(values)}) WHERE NOT EXISTS (SELECT 1 FROM catalog_pointer WHERE catalog_version=${quote(version)});`
