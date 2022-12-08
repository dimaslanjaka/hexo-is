process.cwd = () =>
	require("upath").toUnix(require("upath").join(__dirname, "demo"));

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import Hexo from "hexo";
import { dirname, join } from "upath";
import hexoIs from "../src";

const tmp = join(__dirname, "tmp");

export default function after_render_html(
	htmlContent: string,
	data: Hexo | Hexo.View | Hexo.TemplateLocals | Record<string, any>
) {
	// User configuration
	const { config } = this;
	// Theme configuration
	const { config: themeCfg } = this.theme;

	let logFile = join(tmp, "after_render_html.json");
	let logData: Record<string, any> = {};
	if ("path" in data) {
		logFile = join(
			tmp,
			"after_render_html",
			data.path.replace(/.html$/gi, ".json")
		);
		if (existsSync(logFile)) {
			logData = JSON.parse(readFileSync(logFile, "utf-8"));
		}
	}

	logData = Object.assign({}, logData, {
		data: {
			path: data["path"] || null,
			type: data["type"] || null,
			keys: Object.keys(data),
		},
		hexois: hexoIs(data),
		content: htmlContent.length,
	});

	if (!existsSync(dirname(logFile)))
		mkdirSync(dirname(logFile), { recursive: true });
	writeFileSync(logFile, JSON.stringify(logData, null, 2));
	console.log("log", logFile);
}
