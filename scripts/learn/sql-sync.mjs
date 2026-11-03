const tables = ['quiz_links', 'catalog_quiz', 'catalog_pdfs', 'catalog_lectures', 'catalog_versions']

export const cleanup = () =>
  tables
    .map((table) => `DELETE FROM ${table} WHERE catalog_version NOT IN (SELECT catalog_version FROM catalog_pointer);`)
    .join('\n')

export const begin = () => cleanup()

export const finish = (version) => `INSERT INTO catalog_pointer (id,catalog_version) VALUES (1,'${version}')
ON CONFLICT(id) DO UPDATE SET catalog_version = excluded.catalog_version;
${cleanup()}`
