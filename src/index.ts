/* eslint-disable prefer-rest-params */
import * as fs from "fs";
import Hexo from "hexo";
import hexoLog from "hexo-log";
import path from "path";
import util from "util";
import pkg from "../package.json";
import is from "./is";

const log = hexoLog({
	debug: false,
	silent: false,
});

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
export const hexoIs = function (
	hexo: Hexo | Hexo.View | Hexo.TemplateLocals | Record<string, any>
) {
	if (typeof hexo === "undefined") return;
	if (typeof hexo["page"] != "undefined") return is(hexo);
	if (typeof hexo["type"] != "undefined") {
		const ix = is(hexo);
		if (typeof ix[hexo["type"]] != "undefined") ix[hexo["type"]] = true;
		return ix;
	}
};

/**
 * Dump variable to file
 * @param toDump
 */
export function hexoIsDump(toDump: any, name = "") {
	if (name.length > 0) name = "-" + name;
	const dump = util.inspect(toDump, { showHidden: true, depth: null });
	const loc = path.join("tmp/hexo-is/dump" + name + ".txt");
	if (!fs.existsSync(path.dirname(loc))) {
		fs.mkdirSync(path.dirname(loc), { recursive: true });
	}
	fs.writeFileSync(loc, dump);
	log.log(`${pkg.name}: dump saved to: ${path.resolve(loc)}`);
}

export default hexoIs;
