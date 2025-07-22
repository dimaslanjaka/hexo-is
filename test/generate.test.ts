/* eslint-disable no-control-regex */

import fs from 'fs-extra';
import { globSync } from 'glob';
import Hexo from 'hexo';
import upath from 'upath';
import hexoIs from '../src/index';

const hexo = new Hexo(upath.join(__dirname, 'demo'), { debug: false, silent: true });
const tmp = upath.join(__dirname, 'demo/tmp');

/**
 * Sanitize a string for safe use as a file name. Replaces all special characters with '_',
 * and collapses multiple underscores into a single underscore.
 *
 * @param str - The string to sanitize.
 * @returns The sanitized string.
 */
function sanitize(str: string): string {
  // Replace special chars and control chars (0-31) with -
  return String(str)
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/[\u0000-\u001F]/g, '-')
    .replace(/[^\w.-]/g, '-') // Replace any non-word, non-dot, non-hyphen with -
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

/**
 * Returns a Hexo filter function that writes render output to a JSON file.
 *
 * @param type - The type of render (e.g., 'js', 'css').
 * @returns The filter function.
 */
function writeRenderOutput(type: string) {
  /**
   * Filter callback for Hexo render output.
   *
   * @param content - The content to be rendered.
   * @param data - The data associated with the render.
   */
  const callback = function (
    content: string,
    data: import('hexo/dist/types.js').StoreFunctionData & import('hexo/dist/hexo/locals-d.js').HexoLocalsData
  ) {
    const uniqueId = sanitize(data.page?.path || data.page?.full_source || data.full_source);
    let logFile = upath.join(tmp, uniqueId, `after_render_${type}.json`);
    fs.ensureDirSync(upath.dirname(logFile));
    let logData = {};
    if ('path' in data) {
      logFile = upath.join(tmp, 'after_render_html', data.path.replace(/.html$/gi, '.json'));
      if (fs.existsSync(logFile)) {
        logData = JSON.parse(fs.readFileSync(logFile, 'utf-8'));
      }
    }

    logData = Object.assign({}, logData, {
      data: {
        source: data['full_source'] || data['page']['full_source'] || null,
        path: data['path'] || null,
        type: data['type'] || data['page']?.['type'] || null,
        url: data['url'] || null,
        keys: Object.keys(data),
        page: Object.keys(data['page'] || {})
      },
      hexois: hexoIs(data),
      content: content.length
    });
    fs.outputFileSync(logFile, JSON.stringify(logData, null, 2));
    // if (logData.hexois.page || logData.hexois.post) {
    // 	hexo.log.info(data.path, logData);
    // }
    // hexo.log.info('logFile', logFile);
    return content;
  };
  return callback as (...args: any[]) => string | Promise<string>;
}

hexo.extend.filter.register('after_render:js', writeRenderOutput('js'));
hexo.extend.filter.register('after_render:css', writeRenderOutput('css'));
hexo.extend.filter.register('after_render:html', writeRenderOutput('html'), 1);

/** Main entry point for Hexo test runner. Initializes, loads, generates, and exits Hexo. Exits with error if generation fails.
 */
async function main() {
  await hexo.init();
  await hexo.load();
  try {
    await hexo.call('generate');
    await hexo.exit();
  } catch (err) {
    await hexo.exit(err);
  }
}

/**
 * Find all JSON files in test/demo/tmp and parse their contents as hexoIs objects.
 * Logs the parsed objects to the console.
 */
function parseHexoIsJson() {
  const pattern = upath.join(__dirname, 'demo', 'tmp', '**', '*.json');
  const files = globSync(pattern);
  return files.map((file) => {
    try {
      const data = fs.readFileSync(file, 'utf8');
      const obj = JSON.parse(data);
      // Log the hexois property, throw if not defined
      if (!obj || typeof obj !== 'object' || !('hexois' in obj)) {
        return { file, error: 'hexois property not found' };
      } else {
        return { file, hexois: obj.hexois, path: obj.data.path };
      }
    } catch (err) {
      return { file, error: err.message };
    }
  });
}

describe('Hexo Test Runner', () => {
  beforeAll(async () => {
    await main();
  });

  it('should parse HexoIs JSON files', () => {
    const results = parseHexoIsJson();
    expect(results).toBeInstanceOf(Array);
    // Only test results that do not have errors
    const validResults = results.filter((result) => !result.error);
    for (const result of validResults) {
      expect(result).toHaveProperty('file');
      expect(result).toHaveProperty('hexois');
      expect(result).toHaveProperty('path');
      expect(typeof result.hexois).toBe('object');
      expect(typeof result.path).toBe('string');
      if (/sample-page|page-with-layout/.test(result.path)) {
        expect(result.hexois.page).toBeDefined();
        expect(result.hexois.page).toBeTruthy();
      }
      if (/sample-post|post-with-layout/.test(result.path)) {
        expect(result.hexois.post).toBeDefined();
        expect(result.hexois.post).toBeTruthy();
      }
      if (/archives/.test(result.path)) {
        expect(result.hexois.archive).toBeDefined();
        expect(result.hexois.archive).toBeTruthy();
      }
      if (/2025/.test(result.path)) {
        expect(result.hexois.year).toBeDefined();
        expect(result.hexois.year).toBeTruthy();
      }
      if (/2025\/07/.test(result.path)) {
        expect(result.hexois.month).toBeDefined();
        expect(result.hexois.month).toBeTruthy();
      }
    }
    // Optionally, ensure there are no errors in results
    expect(results.every((result) => !result.error)).toBe(true);
  });
});
