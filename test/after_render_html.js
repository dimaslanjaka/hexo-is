import fs from 'fs-extra';
import upath from 'upath';
import { fileURLToPath } from 'url';

const __dirname = upath.dirname(fileURLToPath(import.meta.url));
process.cwd = () => upath.join(__dirname, 'demo');

import hexoIs from '../dist/index.js';

export const tmp = upath.join(__dirname, 'demo/tmp');

export default function after_render_html(content, data) {
  const hexo = this;
  // User configuration
  // const { config } = this;
  // Theme configuration
  // const { config: themeCfg } = this.theme;

  let logFile = upath.join(tmp, 'after_render_html.json');
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

  fs.ensureDirSync(upath.dirname(logFile));
  fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
  // if (logData.hexois.page || logData.hexois.post) {
  // 	hexo.log.info(data.path, logData);
  // }
  hexo.log.info('logFile', logFile);
  return content;
}
