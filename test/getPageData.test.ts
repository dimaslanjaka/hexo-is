import fs from 'fs';
import Hexo from 'hexo';
import path from 'path';
import { modifyConfig } from './utils.js';

const baseSite = path.join(__dirname, 'demo');
let hexo: Hexo;
let getPageData: (typeof import('../src/getPageData'))['getPageData'];
const config = {
  seo: {
    sitemap: {
      yoast: true,
      txt: true,
      gnews: true
    }
  }
};

jest.setTimeout(120000);

beforeAll(async () => {
  hexo = new Hexo(baseSite, { silent: true });
  modifyConfig(config);
  await hexo.init();
  await hexo.call('clean');
  await hexo.call('generate');
  (global as any).hexo = hexo;
  // Dynamically import sitemapModule after global hexo is set
  getPageData = await import('../dist/index.js').then((m) => m.getPageData);
});

describe('getPageData', () => {
  it('returns page data with "is" and "title" properties for a valid post', () => {
    const cwd = process.cwd();
    console.log('CWD:', cwd);
    console.log('baseSite:', baseSite);
    try {
      const postFiles = fs.readdirSync(path.join(baseSite, 'source', '_posts'));
      console.log('Files in _posts:', postFiles);
    } catch (e) {
      console.log('Error reading _posts:', e);
    }
    const posts = hexo.locals.get('posts');
    const postCount = posts && posts.length !== undefined ? posts.length : posts.data ? posts.data.length : 0;
    console.log('post count:', postCount);
    const page = posts.data ? posts.data[0] : posts[0];
    if (page) {
      console.log('page keys:', Object.keys(page));
      if (page.title) console.log('page.title:', page.title);
    } else {
      console.log('page is undefined or null');
    }
    const data = { page };
    const result = getPageData.call(hexo, data);
    console.log('getPageData result:', result);
    expect(result).toHaveProperty('is');
    expect(result).toHaveProperty('title');
    if (result && page && page.title) expect(result.title).toBe(page.title);
  });

  it('returns undefined when data does not contain a page property', () => {
    const mockData: any = { notPage: {} };
    const result = getPageData.call(hexo, mockData);
    expect(result).toBeUndefined();
  });

  it('returns undefined when page is null', () => {
    const data = { page: null };
    const result = getPageData.call(hexo, data);
    expect(result).toBeUndefined();
  });

  it('returns undefined when page is undefined', () => {
    const data = { page: undefined };
    const result = getPageData.call(hexo, data);
    expect(result).toBeUndefined();
  });
});
