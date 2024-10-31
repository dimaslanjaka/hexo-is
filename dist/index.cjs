'use strict';

var require$$0 = require('fs');
var require$$1 = require('hexo-log');
var require$$2 = require('path');
var require$$3 = require('util');

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var src = {};

var name = "hexo-is";
var version = "2.0.0";
var description = "Determine whether hexo is";
var main = "dist/index.js";
var types = "dist/index.d.ts";
var type = "module";
var module$1 = "dist/index.mjs";
var exports$1 = {
	".": {
		require: {
			"default": "./dist/index.cjs",
			types: "./dist/index.d.ts"
		},
		"import": {
			"default": "./dist/index.mjs",
			types: "./dist/index.d.mts"
		}
	}
};
var files = [
	"dist/"
];
var scripts = {
	test: "echo \"Error: no test specified\" && exit 1",
	build: "tsc && rollup -c",
	clean: "rimraf dist && npm run build",
	hook: "ts-node hook.ts",
	postbuild: "node packer.js",
	update: "npx npm-check-updates -u -x chalk",
	pack: "node packer.cjs --yarn"
};
var keywords = [
];
var repository = {
	type: "git",
	url: "https://github.com/dimaslanjaka/hexo-is.git"
};
var homepage = "https://github.com/dimaslanjaka/hexo-seo/tree/master/packages/hexo-is#readme";
var author = {
	email: "dimaslanjaka@gmail.com",
	name: "Dimas Lanjaka",
	url: "https://github.com/dimaslanjaka"
};
var license = "MIT";
var workspaces = [
	"test/demo",
	"test/demo/themes/*"
];
var dependencies = {
	"fs-extra": "^11.2.0",
	"hexo-log": "^4.1.0",
	minimatch: "^10.0.1",
	"sbg-utility": "^2.0.5",
	upath: "^2.0.1"
};
var devDependencies = {
	"@rollup/plugin-commonjs": "^28.0.1",
	"@rollup/plugin-json": "^6.1.0",
	"@rollup/plugin-node-resolve": "^15.3.0",
	"@types/gulp": "^4.0.17",
	"@types/node": "^22.8.4",
	"cross-spawn": "https://github.com/dimaslanjaka/node-cross-spawn/raw/private/release/cross-spawn.tgz",
	"git-command-helper": "^2.0.2",
	gulp: "^5.0.0",
	"gulp-cli": "^3.0.0",
	hexo: "^7.3.0",
	nodemon: "^3.1.7",
	rimraf: "^6.0.1",
	rollup: "^4.24.3",
	"rollup-plugin-dts": "^6.1.1",
	"ts-node": "^10.9.2",
	typescript: "^5.6.3"
};
var resolutions = {
	"@types/git-command-helper": "https://github.com/dimaslanjaka/git-command-helper/raw/pre-release/release/git-command-helper.tgz",
	"@types/hexo": "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/hexo.tgz",
	"binary-collections": "https://github.com/dimaslanjaka/bin/raw/fcd1121/releases/bin.tgz",
	"cross-spawn": "https://github.com/dimaslanjaka/node-cross-spawn/raw/private/release/cross-spawn.tgz",
	"git-command-helper": "https://github.com/dimaslanjaka/git-command-helper/raw/pre-release/release/git-command-helper.tgz",
	hexo: "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/hexo.tgz",
	"hexo-asset-link": "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/hexo-asset-link.tgz",
	"hexo-cli": "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/hexo-cli.tgz",
	"hexo-front-matter": "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/hexo-front-matter.tgz",
	"hexo-generator-redirect": "https://github.com/dimaslanjaka/hexo-generator-redirect/raw/0885394/release/hexo-generator-redirect.tgz",
	"hexo-log": "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/hexo-log.tgz",
	"hexo-post-parser": "https://github.com/dimaslanjaka/hexo-post-parser/raw/8c4e98159e4407b77e1c25e028c1fd4a0073a8e3/release/hexo-post-parser.tgz",
	"hexo-renderers": "https://github.com/dimaslanjaka/hexo-renderers/raw/add4a2491075dd85281a5dc0c48b74a7ce51d987/release/hexo-renderers.tgz",
	"hexo-seo": "https://github.com/dimaslanjaka/hexo-seo/raw/f4cf27fbc7de2b831462d3b26cf70ece2499d15b/release/hexo-seo.tgz",
	"hexo-server": "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/hexo-server.tgz",
	"hexo-shortcodes": "https://github.com/dimaslanjaka/hexo-shortcodes/raw/f70a1c0/release/hexo-shortcodes.tgz",
	"hexo-util": "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/hexo-util.tgz",
	"instant-indexing": "https://github.com/dimaslanjaka/static-blog-generator/raw/master/packages/instant-indexing/release/instant-indexing.tgz",
	"markdown-it": "https://github.com/dimaslanjaka/markdown-it/raw/17ccc825cbb3e4c6d59edada5f6d93f27075d752/release/markdown-it.tgz",
	"nodejs-package-types": "https://github.com/dimaslanjaka/nodejs-package-types/raw/a2e797bc27975cba20ef4c87547841e6341bfcf4/release/nodejs-package-types.tgz",
	"sbg-api": "https://github.com/dimaslanjaka/static-blog-generator/raw/74a402210be05e3452a386f90b80521e1182a724/packages/sbg-api/release/sbg-api.tgz",
	"sbg-cli": "https://github.com/dimaslanjaka/static-blog-generator/raw/0164b0d2e4ba5453890af8ec4863b2a09e043815/packages/sbg-cli/release/sbg-cli.tgz",
	"sbg-server": "https://github.com/dimaslanjaka/static-blog-generator/raw/master/packages/sbg-server/release/sbg-server.tgz",
	"sbg-utility": "https://github.com/dimaslanjaka/static-blog-generator/raw/c7e82cae850b9fd6c1829ff6d30ef3ee8987019b/packages/sbg-utility/release/sbg-utility.tgz",
	"static-blog-generator": "https://github.com/dimaslanjaka/static-blog-generator/raw/master/packages/static-blog-generator/release/static-blog-generator.tgz",
	warehouse: "https://github.com/dimaslanjaka/hexo/raw/monorepo-v7/releases/warehouse.tgz"
};
var packageManager = "yarn@4.5.1";
var require$$4 = {
	name: name,
	version: version,
	description: description,
	main: main,
	types: types,
	type: type,
	module: module$1,
	exports: exports$1,
	files: files,
	scripts: scripts,
	keywords: keywords,
	repository: repository,
	homepage: homepage,
	author: author,
	license: license,
	workspaces: workspaces,
	dependencies: dependencies,
	devDependencies: devDependencies,
	resolutions: resolutions,
	packageManager: packageManager
};

var is = {};

/* eslint-disable @typescript-eslint/no-this-alias */

var hasRequiredIs;

function requireIs () {
	if (hasRequiredIs) return is;
	hasRequiredIs = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.tag = exports.category = exports.month = exports.year = exports.archive = exports.page = exports.post = exports.home = exports.current = void 0;
		exports.default = internalIs;
		function isCurrentHelper(path, strict) {
		    if (path === void 0) { path = "/"; }
		    var currentPath = this.path.replace(/^[^/].*/, "/$&");
		    if (strict) {
		        if (path.endsWith("/"))
		            path += "index.html";
		        path = path.replace(/^[^/].*/, "/$&");
		        return currentPath === path;
		    }
		    path = path.replace(/\/index\.html$/, "/");
		    if (path === "/")
		        return currentPath === "/index.html";
		    path = path.replace(/^[^/].*/, "/$&");
		    return currentPath.startsWith(path);
		}
		function isHomeHelper() {
		    return Boolean(this.page.__index);
		}
		function isPostHelper() {
		    if (this.page) {
		        var src = this.page["full_source"] || "";
		        var layout = this.page.layout || "";
		        if (layout.startsWith("post"))
		            return true;
		        if (layout.startsWith("page"))
		            return false;
		        if (src !== "") {
		            return Boolean(this.page.__post) && src.includes("_posts");
		        }
		    }
		    return Boolean(this.page.__post);
		}
		function isPageHelper() {
		    if (this.page) {
		        var src = this.page["full_source"] || "";
		        var layout = this.page.layout || "";
		        if (layout.startsWith("post"))
		            return false;
		        if (layout.startsWith("page"))
		            return true;
		        if (src !== "") {
		            return Boolean(this.page.__post) && !src.includes("_posts");
		        }
		    }
		    return Boolean(this.page.__page);
		}
		function isArchiveHelper() {
		    return Boolean(this.page.archive);
		}
		function isYearHelper(year) {
		    var page = this.page;
		    if (!page.archive)
		        return false;
		    if (year) {
		        return page.year === year;
		    }
		    return Boolean(page.year);
		}
		function isMonthHelper(year, month) {
		    var page = this.page;
		    if (!page.archive)
		        return false;
		    if (year) {
		        if (month) {
		            return page.year === year && page.month === month;
		        }
		        return page.month === year;
		    }
		    return Boolean(page.year && page.month);
		}
		function isCategoryHelper(category) {
		    if (category) {
		        return this.page.category === category;
		    }
		    return Boolean(this.page.category);
		}
		function isTagHelper(tag) {
		    if (tag) {
		        return this.page.tag === tag;
		    }
		    return Boolean(this.page.tag);
		}
		exports.current = isCurrentHelper;
		exports.home = isHomeHelper;
		exports.post = isPostHelper;
		exports.page = isPageHelper;
		exports.archive = isArchiveHelper;
		exports.year = isYearHelper;
		exports.month = isMonthHelper;
		exports.category = isCategoryHelper;
		exports.tag = isTagHelper;
		/**
		 * Custom function
		 * @param hexo
		 * @returns
		 */
		function internalIs(hexo) {
		    var obj = {
		        current: false,
		        home: false,
		        post: false,
		        page: false,
		        archive: false,
		        year: false,
		        month: false,
		        category: false,
		        tag: false,
		        message: "try using second argument",
		    };
		    if (typeof hexo["page"] == "undefined")
		        return obj;
		    return {
		        current: exports.current.bind(hexo)(),
		        home: exports.home.bind(hexo)(),
		        post: exports.post.bind(hexo)(),
		        page: exports.page.bind(hexo)(),
		        archive: exports.archive.bind(hexo)(),
		        year: exports.year.bind(hexo)(),
		        month: exports.month.bind(hexo)(),
		        category: exports.category.bind(hexo)(),
		        tag: exports.tag.bind(hexo)(),
		    };
		} 
	} (is));
	return is;
}

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src;
	hasRequiredSrc = 1;
	(function (exports) {
		var __createBinding = (src && src.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (src && src.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (src && src.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		var __importDefault = (src && src.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.hexoIs = void 0;
		exports.hexoIsDump = hexoIsDump;
		/* eslint-disable prefer-rest-params */
		var fs = __importStar(require$$0);
		var hexo_log_1 = __importDefault(require$$1);
		var path_1 = __importDefault(require$$2);
		var util_1 = __importDefault(require$$3);
		var package_json_1 = __importDefault(require$$4);
		var is_1 = __importDefault(requireIs());
		var log = (0, hexo_log_1.default)({
		    debug: false,
		    silent: false,
		});
		/**
		 * @example
		 * // run inside plugin or theme event
		 * import hexoIs from 'hexo-is';
		 * const hexo = this;
		 * console.log(hexoIs(hexo)); // object or string
		 * @param hexo
		 * @returns
		 */
		var hexoIs = function (hexo) {
		    if (typeof hexo === "undefined")
		        return;
		    if (typeof hexo["page"] != "undefined")
		        return (0, is_1.default)(hexo);
		    if (typeof hexo["type"] != "undefined") {
		        var ix = (0, is_1.default)(hexo);
		        if (typeof ix[hexo["type"]] != "undefined")
		            ix[hexo["type"]] = true;
		        return ix;
		    }
		};
		exports.hexoIs = hexoIs;
		/**
		 * Dump variable to file
		 * @param toDump
		 */
		function hexoIsDump(toDump, name) {
		    if (name === void 0) { name = ""; }
		    if (name.length > 0)
		        name = "-" + name;
		    var dump = util_1.default.inspect(toDump, { showHidden: true, depth: null });
		    var loc = path_1.default.join("tmp/hexo-is/dump" + name + ".txt");
		    if (!fs.existsSync(path_1.default.dirname(loc))) {
		        fs.mkdirSync(path_1.default.dirname(loc), { recursive: true });
		    }
		    fs.writeFileSync(loc, dump);
		    log.log("".concat(package_json_1.default.name, ": dump saved to: ").concat(path_1.default.resolve(loc)));
		}
		exports.default = exports.hexoIs; 
	} (src));
	return src;
}

var srcExports = requireSrc();
var index = /*@__PURE__*/getDefaultExportFromCjs(srcExports);

module.exports = index;
