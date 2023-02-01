import Hexo from "hexo";
export type TemplateLocals = Hexo.TemplateLocals;
/**
 * @example
 * // run inside plugin or theme event
 * import hexoIs from 'hexo-is';
 * const hexo = this;
 * console.log(hexoIs(hexo)); // object or string
 * @param hexo
 * @returns
 */
export declare const hexoIs: (hexo: Hexo | Hexo.View | Hexo.TemplateLocals | Record<string, any>) => import("./is").HexoIs;
/**
 * Dump variable to file
 * @param toDump
 */
export declare function hexoIsDump(toDump: any, name?: string): void;
export default hexoIs;
