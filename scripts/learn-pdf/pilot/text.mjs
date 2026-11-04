export const escape = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
export const detail = s => /^https:\/\//.test(s)
  ? `<a href="${escape(s)}">${escape(s.replace(/^https:\/\//, '')).replaceAll('/', '/<wbr>')}</a>` : escape(s);
