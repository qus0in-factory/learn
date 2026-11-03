import { execFileSync } from 'node:child_process';
import { verifyR2 } from './verify-r2.mjs';
import { root } from '../learn-pdf/paths.mjs';
import { workerConfig } from './worker-config.mjs';
export async function deploy(verify = verifyR2, run = execFileSync) {
  await verify();
  const options = { cwd: root, stdio: 'inherit' };
  run('pnpm', ['--dir', 'course-site', 'exec', 'vitepress', 'build', '../learn-site'], options);
  run(process.execPath, ['scripts/sync-learn-d1.mjs'], options);
  const config = ['--config', 'learn-worker/wrangler.jsonc'];
  run('npx', ['wrangler', 'deploy', ...config], options);
  const db = workerConfig().d1_databases.find(b => b.binding === 'DB').database_name;
  run('npx', ['wrangler', 'd1', 'execute', db, '--remote', ...config,
    '--file=dist/learn-d1.sql'], options);
}
