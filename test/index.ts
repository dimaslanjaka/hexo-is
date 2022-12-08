process.cwd = () => require("upath").join(__dirname, "demo");

import Hexo from "hexo";
import hexoIs from "../src";

const hexo = new Hexo(process.cwd(), {});

hexo.init().then(function () {
	hexo.extend.filter.register("after_render:js", where);
	hexo.extend.filter.register("after_render:css", where);
	hexo.extend.filter.register("after_render:html", where);
	hexo.load().then(function () {
		const is = hexoIs(this);
		console.log(is);
	});
});

function where(_content: any, data: Hexo | Hexo.View | Hexo.TemplateLocals) {
	console.log(hexoIs(data));
}
