-- Versioned catalog tables. The legacy tables remain readable by the previous
-- Worker until the new Worker is deployed; this migration does not drop them.
CREATE TABLE IF NOT EXISTS catalog_versions (
  catalog_version TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  asset_version TEXT NOT NULL,
  synced_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS catalog_pointer (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  catalog_version TEXT NOT NULL REFERENCES catalog_versions(catalog_version)
);

CREATE TABLE IF NOT EXISTS catalog_lectures (
  catalog_version TEXT NOT NULL REFERENCES catalog_versions(catalog_version),
  slug TEXT NOT NULL,
  day INTEGER NOT NULL,
  position INTEGER NOT NULL,
  title TEXT NOT NULL,
  schedule TEXT NOT NULL,
  PRIMARY KEY (catalog_version, slug),
  UNIQUE (catalog_version, position)
);

CREATE TABLE IF NOT EXISTS catalog_pdfs (
  catalog_version TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  file_name TEXT NOT NULL,
  url TEXT NOT NULL,
  PRIMARY KEY (catalog_version, lesson_slug),
  FOREIGN KEY (catalog_version, lesson_slug)
    REFERENCES catalog_lectures(catalog_version, slug)
);

CREATE TABLE IF NOT EXISTS catalog_quiz (
  catalog_version TEXT NOT NULL,
  position INTEGER NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  lesson_slug TEXT,
  PRIMARY KEY (catalog_version, position),
  FOREIGN KEY (catalog_version, lesson_slug)
    REFERENCES catalog_lectures(catalog_version, slug)
);

INSERT OR IGNORE INTO catalog_versions
  (catalog_version, title, asset_version, synced_at)
  SELECT 'legacy-0001', title, asset_version, synced_at
  FROM course_meta WHERE id = 1;

INSERT OR IGNORE INTO catalog_pointer (id, catalog_version)
  SELECT 1, 'legacy-0001'
  WHERE EXISTS (SELECT 1 FROM catalog_versions WHERE catalog_version = 'legacy-0001');

INSERT OR IGNORE INTO catalog_lectures
  (catalog_version, slug, day, position, title, schedule)
  SELECT 'legacy-0001', slug, day, position, title, schedule FROM lectures;

INSERT OR IGNORE INTO catalog_pdfs
  (catalog_version, lesson_slug, file_name, url)
  SELECT 'legacy-0001', lesson_slug, file_name, url FROM pdf_assets;

INSERT OR IGNORE INTO catalog_quiz
  (catalog_version, position, question, answer, lesson_slug)
  SELECT 'legacy-0001', position, question, answer, lesson_slug FROM quiz_questions;
