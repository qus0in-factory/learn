export function place(content, unit) {
  const last = content.lastElementChild;
  if (unit.sourceTable && last?.sourceTable === unit.sourceTable) {
    const row = unit.querySelector('tbody tr');
    last.querySelector('tbody').append(row);
    return () => unit.querySelector('tbody').append(row);
  }
  content.append(unit);
  return () => unit.remove();
}
