CREATE TABLE IF NOT EXISTS course_meta (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  title TEXT NOT NULL,
  asset_version TEXT NOT NULL,
  synced_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lectures (
  slug TEXT PRIMARY KEY,
  day INTEGER NOT NULL,
  position INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  schedule TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pdf_assets (
  lesson_slug TEXT PRIMARY KEY REFERENCES lectures(slug),
  file_name TEXT NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  position INTEGER PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  lesson_slug TEXT REFERENCES lectures(slug)
);
