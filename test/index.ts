process.cwd = () => require("upath").join(__dirname, "demo");

import { existsSync, mkdirSync, writeFileSync } from "fs";
import Hexo from "hexo";
import { join } from "upath";
import hexoIs from "../src";

const tmp = join(__dirname, "tmp");

if (!existsSync(tmp)) mkdirSync(tmp);

const hexo = new Hexo(process.cwd(), {});

hexo.init().then(function () {
	hexo.extend.filter.register(
		"after_render:js",
		function (_content: any, data: Hexo | Hexo.View | Hexo.TemplateLocals) {
			writeFileSync(
				join(tmp, "after_render_js.json"),
				JSON.stringify(hexoIs(data))
			);
		}
	);
	hexo.extend.filter.register(
		"after_render:css",
		function (_content: any, data: Hexo | Hexo.View | Hexo.TemplateLocals) {
			writeFileSync(
				join(tmp, "after_render_css.json"),
				JSON.stringify(hexoIs(data))
			);
		}
	);
	hexo.extend.filter.register(
		"after_render:html",
		function (_content: any, data: Hexo | Hexo.View | Hexo.TemplateLocals) {
			writeFileSync(
				join(tmp, "after_render_html.json"),
				JSON.stringify(hexoIs(data))
			);
		}
	);
	hexo.load().then(function () {
		hexo
			.call("generate")
			.then(function () {
				return hexo.exit();
			})
			.catch(function (err) {
				return hexo.exit(err);
			});
	});
});

function _where(_content: any, data: Hexo | Hexo.View | Hexo.TemplateLocals) {
	console.log(_content, hexoIs(data));
}
