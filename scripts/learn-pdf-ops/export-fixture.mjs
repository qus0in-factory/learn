export const calls = [];
const page = {
  evaluate: async () => ({ pages: 2 }),
  pdf: async options => calls.push({ event: 'pdf', ...options }),
  close: async () => calls.push({ event: 'close' }),
};
export async function prepare(browser, read) {
  const source = JSON.parse(await read('step01.json'));
  calls.push({ event: 'create', browser, source });
  return page;
}
export const summary = () => '<h1>Fixture</h1>';
export const inspect = async () => ({ maxCodeLines: 1 });
export const bounds = async () => [];
export const geometry = bounds;
export const presentationAudit = bounds;
export const overlap = bounds;
export async function auditFonts(actual) {
  if (actual !== page) throw Error('Wrong page audited');
  calls.push({ event: 'audit' });
  return ['Pinned Noto'];
}
