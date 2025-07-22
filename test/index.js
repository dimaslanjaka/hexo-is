import fs from 'fs-extra';
import Hexo from 'hexo';
import upath from 'upath';
import { fileURLToPath } from 'url';
import hexoIs from '../dist/index.js';
import after_render_html, { tmp } from './after_render_html.js';

const __dirname = upath.dirname(fileURLToPath(import.meta.url));
const hexo = new Hexo(upath.join(__dirname, 'demo'), { debug: false, silent: true });

// hexo.extend.filter: https://hexo.io/api/filter

hexo.extend.filter.register('after_render:js', (content, data) => {
  const uniqueId = String(data.page.path || data.page.full_source || data.full_source).replace(
    // eslint-disable-next-line no-control-regex
    /[<>:"/\\|?*\x00-\x1F]/g,
    '_'
  );
  fs.writeFileSync(upath.join(tmp, uniqueId, 'after_render_js.json'), JSON.stringify(hexoIs(data)));
  return content;
});

hexo.extend.filter.register('after_render:css', (content, data) => {
  const uniqueId = String(data.page.path || data.page.full_source || data.full_source).replace(
    // eslint-disable-next-line no-control-regex
    /[<>:"/\\|?*\x00-\x1F]/g,
    '_'
  );
  fs.writeFileSync(upath.join(tmp, uniqueId, 'after_render_css.json'), JSON.stringify(hexoIs(data)));
  return content;
});

hexo.extend.filter.register('after_render:html', after_render_html, 1);

hexo.init().then(() => {
  hexo.load().then(() => {
    hexo
      .call('generate')
      .then(() => hexo.exit())
      .catch((err) => hexo.exit(err));
  });
});
