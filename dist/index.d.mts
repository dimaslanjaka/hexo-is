import Hexo from 'hexo';
import { HexoLocalsData } from 'hexo/dist/hexo/locals-d';

interface HexoIs {
    current: boolean;
    home: boolean;
    post: boolean;
    page: boolean;
    archive: boolean;
    year: boolean;
    month: boolean;
    category: boolean;
    tag: boolean;
    message?: string;
}

/**
 * @example
 * // run inside plugin or theme event
 * import hexoIs from 'hexo-is';
 * const hexo = this;
 * console.log(hexoIs(hexo)); // object or string
 * @param hexo
 * @returns
 */
declare const hexoIs: (hexo: Hexo | HexoLocalsData) => HexoIs;
/**
 * Dump variable to file
 * @param toDump
 */
declare function hexoIsDump(toDump: any, name?: string): void;

export { hexoIs as default, hexoIs, hexoIsDump };
