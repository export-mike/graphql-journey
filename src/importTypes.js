// @flow
import requireDirectory from 'require-directory';

export default function(path: string): Object {
  return new Promise((resolve, reject) => {
    try {
      resolve(requireDirectory(module, path));
    } catch (e) {
      reject(e);
    }
  });
}
