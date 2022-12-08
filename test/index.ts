process.cwd = () => require("upath").join(__dirname, "demo");

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import Hexo from "hexo";
import { join } from "upath";
import hexoIs from "../src";

const tmp = join(__dirname, "tmp");

if (!existsSync(tmp)) mkdirSync(tmp);

const hexo = new Hexo(process.cwd(), {});

// hexo.extend.filter: https://hexo.io/api/filter

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
		function (
			htmlContent: string,
			data: Hexo | Hexo.View | Hexo.TemplateLocals
		) {
			// User configuration
			const { config } = this;
			// Theme configuration
			const { config: themeCfg } = this.theme;

			let logFile: string | undefined;
			let logData: Record<string, any> = {};
			if ("path" in data) {
				logFile = join(tmp, "after_render_html.json");
				if (existsSync(logFile)) {
					logData = JSON.parse(readFileSync(logFile, "utf-8"));
				}
			}

			if (typeof logFile === "string") {
				logData = Object.assign({}, logData, {
					data: {
						path: data["path"],
						type: data["type"],
					},
					hexois: hexoIs(data),
					content: htmlContent,
				});
				writeFileSync(logFile, JSON.stringify(logData, null, 2));
			}
		},
		1
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
