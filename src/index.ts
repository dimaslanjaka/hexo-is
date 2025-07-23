import * as fs from 'fs';
import Hexo from 'hexo';
import { logger } from 'hexo-log';
import { HexoLocalsData } from 'hexo/dist/hexo/locals-d';
import path from 'path';
import util from 'util';
import pkg from '../package.json';
import internalis from './is';
import { TemplateLocals } from './types';

const log =
  typeof hexo !== 'undefined'
    ? hexo.log
    : logger({
        debug: false,
        silent: false
      });

/**
 * @example
 * // run inside plugin or theme event
 * import hexoIs from 'hexo-is';
 * const hexo = this;
 * console.log(hexoIs(hexo)); // object or string
 * @param hexoData
 * @returns
 */
export const hexoIs = function (hexoData: Hexo | HexoLocalsData | TemplateLocals) {
  if (typeof hexoData === 'undefined') return;
  if (typeof hexoData['page'] != 'undefined') return internalis(hexoData as any);
  if (typeof hexoData['type'] != 'undefined') {
    const lib = internalis(hexoData as any);
    if (typeof lib[hexoData['type']] != 'undefined') lib[hexoData['type']] = true;
    return lib;
  }
};

/**
 * Dump variable to file
 * @param toDump
 */
export function hexoIsDump(toDump: any, name = '') {
  if (name.length > 0) name = '-' + name;
  const dump = util.inspect(toDump, { showHidden: true, depth: null });
  const loc = path.join('tmp/hexo-is/dump' + name + '.txt');
  if (!fs.existsSync(path.dirname(loc))) {
    fs.mkdirSync(path.dirname(loc), { recursive: true });
  }
  fs.writeFileSync(loc, dump);
  log.log(`${pkg.name}: dump saved to: ${path.resolve(loc)}`);
}

export default hexoIs;
