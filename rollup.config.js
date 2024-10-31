import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import { dts } from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };

const external = Object.keys(packageJson.dependencies)
	.concat(packageJson.devDependencies)
	.flat();

const declaration = {
	input: "./tmp/dist/src/index.d.ts",
	output: [
		{ file: "dist/index.d.ts", format: "es" },
		{ file: "dist/index.d.cts", format: "es" },
		{ file: "dist/index.d.mts", format: "es" },
	],
	plugins: [dts()],
};

const fromDist = {
	input: "./tmp/dist/src/index.js",
	output: [
		{ file: "dist/index.js", format: "esm" },
		{ file: "dist/index.cjs", format: "cjs" },
		{ file: "dist/index.mjs", format: "esm" },
	],
	plugins: [
		json(),
		resolve({ preferBuiltins: true }),
		commonjs(),
		babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
	],
	external,
};

export default [declaration, fromDist];
