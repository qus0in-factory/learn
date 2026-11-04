const sizes = { stat:[2,4], split:[2,3], steps:[3,5], rows:[3,5] };
export function checkVariety(s) {
  const values = s.type === 'rows' ? s.rows : s.type === 'steps' ? s.steps : s.items;
  if (sizes[s.type]) {
    const [min,max] = sizes[s.type];
    if (!Array.isArray(values) || values.length < min || values.length > max)
      throw Error(`Invalid ${s.type} item count`);
  }
  if (s.type === 'split' && [s.diagram,s.image,s.code].filter(Boolean).length !== 1)
    throw Error('Split requires exactly one diagram, image or code');
  if (s.type === 'compare' && [s.left,s.right].some(v => !v?.label || !v.lines?.length || v.lines.length > 3))
    throw Error('Compare requires two labeled panels');
  if (s.type === 'statement' && (!s.statement || !s.basis || (s.emphasis && !s.statement.includes(s.emphasis))))
    throw Error('Invalid statement');
}
