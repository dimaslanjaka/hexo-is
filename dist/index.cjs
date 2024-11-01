'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var hexoLog = require('hexo-log');
var path = require('path');
var util = require('util');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);

var name = "hexo-is";
var version = "2.0.2";
var description = "Determine whether current hexo data is";
var main = "dist/index.js";
var types = "dist/index.d.ts";
var type = "module";
var module$1 = "dist/index.mjs";
var exports$1 = {
	".": {
		require: {
			"default": "./dist/index.cjs",
			types: "./dist/index.d.cts"
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
	test: "node test/index.js",
	build: "tsc && rollup -c",
	clean: "rimraf dist && npm run build",
	postbuild: "node packer.js",
	update: "npx npm-check-updates -u -x chalk",
	pack: "node packer.cjs --yarn"
};
var keywords = [
];
var repository = {
	type: "git",
	url: "https://github.com/dimaslanjaka/hexo-is"
};
var homepage = "https://github.com/dimaslanjaka/hexo-is";
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
	"@babel/core": "^7.26.0",
	"@babel/preset-env": "^7.26.0",
	"@rollup/plugin-babel": "^6.0.4",
	"@rollup/plugin-commonjs": "^28.0.1",
	"@rollup/plugin-json": "^6.1.0",
	"@rollup/plugin-node-resolve": "^15.3.0",
	"@types/babel__core": "^7",
	"@types/babel__preset-env": "^7",
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
	"hexo-post-parser": "https://github.com/dimaslanjaka/hexo-post-parser/raw/d9f3a9ba3585188dfb30159ff588b709f0238326/release/hexo-post-parser.tgz",
	"hexo-renderers": "https://github.com/dimaslanjaka/hexo-renderers/raw/0534154ea2bbc4a06fe347861e8ebfc7a722c10f/release/hexo-renderers.tgz",
	"hexo-seo": "https://github.com/dimaslanjaka/hexo-seo/raw/7729b4246934d7319c4bcacbbe01a3748b5f5056/release/hexo-seo.tgz",
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
var pkg = {
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

/* eslint-disable @typescript-eslint/no-this-alias */
// source of https://github.com/hexojs/hexo/blob/master/lib/plugins/helper/is.js

function isCurrentHelper(path = "/", strict) {
  const currentPath = this.path.replace(/^[^/].*/, "/$&");
  if (strict) {
    if (path.endsWith("/")) path += "index.html";
    path = path.replace(/^[^/].*/, "/$&");
    return currentPath === path;
  }
  path = path.replace(/\/index\.html$/, "/");
  if (path === "/") return currentPath === "/index.html";
  path = path.replace(/^[^/].*/, "/$&");
  return currentPath.startsWith(path);
}
function isHomeHelper() {
  return Boolean(this.page.__index);
}
function isPostHelper() {
  if (this.page) {
    const src = this.page["full_source"] || "";
    const layout = this.page.layout || "";
    if (layout.startsWith("post")) return true;
    if (layout.startsWith("page")) return false;
    if (src !== "") {
      return Boolean(this.page.__post) && src.includes("_posts");
    }
  }
  return Boolean(this.page.__post);
}
function isPageHelper() {
  if (this.page) {
    const src = this.page["full_source"] || "";
    const layout = this.page.layout || "";
    if (layout.startsWith("post")) return false;
    if (layout.startsWith("page")) return true;
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
  const {
    page
  } = this;
  if (!page.archive) return false;
  if (year) {
    return page.year === year;
  }
  return Boolean(page.year);
}
function isMonthHelper(year, month) {
  const {
    page
  } = this;
  if (!page.archive) return false;
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
const current = isCurrentHelper;
const home = isHomeHelper;
const post = isPostHelper;
const page = isPageHelper;
const archive = isArchiveHelper;
const year = isYearHelper;
const month = isMonthHelper;
const category = isCategoryHelper;
const tag = isTagHelper;
/**
 * Custom function
 * @param hexo
 * @returns
 */
function internalIs(hexo) {
  const obj = {
    current: false,
    home: false,
    post: false,
    page: false,
    archive: false,
    year: false,
    month: false,
    category: false,
    tag: false,
    message: "try using second argument"
  };
  if (typeof hexo["page"] == "undefined") return obj;
  return {
    current: current.bind(hexo)(),
    home: home.bind(hexo)(),
    post: post.bind(hexo)(),
    page: page.bind(hexo)(),
    archive: archive.bind(hexo)(),
    year: year.bind(hexo)(),
    month: month.bind(hexo)(),
    category: category.bind(hexo)(),
    tag: tag.bind(hexo)()
  };
}

/* eslint-disable prefer-rest-params */
const log = typeof hexo !== "undefined" ? hexo.log : hexoLog.logger({
  debug: false,
  silent: false
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
const hexoIs = function (hexo) {
  if (typeof hexo === "undefined") return;
  if (typeof hexo["page"] != "undefined") return internalIs(hexo);
  if (typeof hexo["type"] != "undefined") {
    const ix = internalIs(hexo);
    if (typeof ix[hexo["type"]] != "undefined") ix[hexo["type"]] = true;
    return ix;
  }
};
/**
 * Dump variable to file
 * @param toDump
 */
function hexoIsDump(toDump, name = "") {
  if (name.length > 0) name = "-" + name;
  const dump = util.inspect(toDump, {
    showHidden: true,
    depth: null
  });
  const loc = path.join("tmp/hexo-is/dump" + name + ".txt");
  if (!fs__namespace.existsSync(path.dirname(loc))) {
    fs__namespace.mkdirSync(path.dirname(loc), {
      recursive: true
    });
  }
  fs__namespace.writeFileSync(loc, dump);
  log.log(`${pkg.name}: dump saved to: ${path.resolve(loc)}`);
}

exports.default = hexoIs;
exports.hexoIs = hexoIs;
exports.hexoIsDump = hexoIsDump;
