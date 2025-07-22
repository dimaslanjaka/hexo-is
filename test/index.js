/* eslint-disable no-control-regex */
import fs from 'fs-extra';
import { globSync } from 'glob';
import Hexo from 'hexo';
import upath from 'upath';
import { fileURLToPath } from 'url';
import hexoIs from '../dist/index.js';

const __dirname = upath.dirname(fileURLToPath(import.meta.url));
const hexo = new Hexo(upath.join(__dirname, 'demo'), { debug: false, silent: true });
const tmp = upath.join(__dirname, 'demo/tmp');

/**
 * Sanitize a string for safe use as a file name. Replaces all special characters with '_',
 * and collapses multiple underscores into a single underscore.
 * @param {string} str - The string to sanitize.
 * @returns {string} The sanitized string.
 */
const sanitize = (str) => {
  // Replace special chars and control chars (0-31) with _
  return String(str)
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/[\u0000-\u001F]/g, '_')
    .replace(/[^\w.-]/g, '_') // Replace any non-word, non-dot, non-hyphen with _
    .replace(/_+/g, '_') // Collapse multiple underscores
    .replace(/^_+|_+$/g, ''); // Trim leading/trailing underscores
};

/** Returns a Hexo filter function that writes render output to a JSON file.
 * @param {string} type - The type of render (e.g., 'js', 'css').
 * @returns {(...args: any[]) => any} The filter function.
 */
function writeRenderOutput(type) {
  /**
   * @param {string} content - The content to be rendered.
   * @param {import('hexo/dist/types.js').StoreFunctionData & import('hexo/dist/hexo/locals-d.js').HexoLocalsData} data - The data associated with the render.
   */
  const callback = function (content, data) {
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
  return callback;
}

hexo.extend.filter.register('after_render:js', writeRenderOutput('js'));
hexo.extend.filter.register('after_render:css', writeRenderOutput('css'));
hexo.extend.filter.register('after_render:html', writeRenderOutput('html'), 1);

/** Main entry point for Hexo test runner. Initializes, loads, generates, and exits Hexo. Exits with error if generation fails.
 * @returns {Promise<void>}
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
  files.forEach((file) => {
    try {
      const data = fs.readFileSync(file, 'utf8');
      const obj = JSON.parse(data);
      // Log the hexois property, throw if not defined
      if (!obj || typeof obj !== 'object' || !('hexois' in obj)) {
        console.error(`hexois property not found in ${file}`);
      } else {
        console.log(obj.data.path, obj.hexois);
      }
    } catch (err) {
      console.error(`Failed to parse ${file}:`, err);
    }
  });
}

main().then(parseHexoIsJson);
