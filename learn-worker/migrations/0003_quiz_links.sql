CREATE TABLE IF NOT EXISTS quiz_links (
  catalog_version TEXT NOT NULL,
  quiz_position INTEGER NOT NULL,
  link_position INTEGER NOT NULL,
  lesson_slug TEXT NOT NULL,
  PRIMARY KEY (catalog_version, quiz_position, link_position),
  UNIQUE (catalog_version, quiz_position, lesson_slug),
  FOREIGN KEY (catalog_version, quiz_position)
    REFERENCES catalog_quiz(catalog_version, position),
  FOREIGN KEY (catalog_version, lesson_slug)
    REFERENCES catalog_lectures(catalog_version, slug)
);

INSERT OR IGNORE INTO quiz_links
  (catalog_version, quiz_position, link_position, lesson_slug)
  SELECT catalog_version, position, 0, lesson_slug
  FROM catalog_quiz WHERE lesson_slug IS NOT NULL;
