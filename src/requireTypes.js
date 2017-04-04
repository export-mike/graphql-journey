// @flow
import requireDirectory from 'require-directory';

export default (path: string): Object => requireDirectory(module, path);
