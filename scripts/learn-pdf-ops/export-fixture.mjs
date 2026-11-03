export const calls = [];
const page = {
  evaluate: async () => ({ pages: 2 }),
  pdf: async options => calls.push({ event: 'pdf', ...options }),
  close: async () => calls.push({ event: 'close' }),
};
export async function createPage(browser, bundle, title) {
  calls.push({ event: 'create', browser, bundle, title });
  return page;
}
export const lesson = async () => '<h1>Fixture</h1>';
export const inspect = async () => ({ maxCodeLines: 1 });
export async function auditFonts(actual) {
  if (actual !== page) throw Error('Wrong page audited');
  calls.push({ event: 'audit' });
  return ['Pinned Noto'];
}
