process.cwd = () => __dirname;
import { TemplateLocals, View } from "hexo";
import hexoIs from "../src";

export default function (
	_content: any,
	data: import("hexo") | View | TemplateLocals
) {
	const is = hexoIs(data);
	console.log({ is });
	//hexoIsDump(arguments, "after_render_html_args");
}
