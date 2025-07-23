import type Hexo from 'hexo';
import { HexoLocalsData } from 'hexo/dist/hexo/locals-d';
import { hexoIs } from './index';

/**
 * Extract Page Data
 * @param data
 * @returns
 */
export function getPageData(this: Hexo, data: HexoLocalsData) {
  const is = hexoIs.call(this, data);
  if (data['page']) {
    const page = data['page'];
    page.is = is;
    return page;
  }
}

export default getPageData;
