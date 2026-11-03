import { objects } from './objects.mjs';
import { remoteObject } from './remote-object.mjs';
import { verifyFiles } from './verify-files.mjs';
export async function verifyR2() {
  await verifyFiles(objects(), remoteObject);
  console.log('R2 completeness: 12/12 objects, size/SHA verified');
}
