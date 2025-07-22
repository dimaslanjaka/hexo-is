import Hexo from 'hexo';
import { TemplateLocals } from './types';

type Page = Record<string, any>;

function isCurrentHelper(this: TemplateLocals, postPath = '/', strict?: boolean): boolean {
  if (typeof this.path !== 'string') return false;
  const currentPath = this.path.replace(/^[^/].*/, '/$&');
  if (strict) {
    if (postPath.endsWith('/')) postPath += 'index.html';
    postPath = postPath.replace(/^[^/].*/, '/$&');
    return currentPath === postPath;
  }
  postPath = postPath.replace(/\/index\.html$/, '/');
  if (postPath === '/') return currentPath === '/index.html';
  postPath = postPath.replace(/^[^/].*/, '/$&');
  return currentPath.startsWith(postPath);
}

function isHomeHelper(this: TemplateLocals): boolean {
  return Boolean(this.page?.__index);
}

function isPostHelper(this: TemplateLocals): boolean {
  const page: Page = this.page || {};
  const src = page.full_source || '';
  const layout = page.layout || '';
  if (layout.startsWith('post')) return true;
  if (layout.startsWith('page')) return false;
  if (src) return Boolean(page.__post) && src.includes('_posts');
  return Boolean(page.__post);
}

function isPageHelper(this: TemplateLocals): boolean {
  const page: Page = this.page || {};
  const src = page.full_source || '';
  const layout = page.layout || '';
  if (layout.startsWith('post')) return false;
  if (layout.startsWith('page')) return true;
  if (src) return Boolean(page.__post) && !src.includes('_posts');
  return Boolean(page.__page);
}

function isArchiveHelper(this: TemplateLocals): boolean {
  return Boolean(this.page?.archive);
}

function isYearHelper(this: TemplateLocals, year?: any): boolean {
  const page = this.page;
  if (!page?.archive) return false;
  if (year) return page.year === year;
  return Boolean(page.year);
}

function isMonthHelper(this: TemplateLocals, year?: any, month?: any): boolean {
  const page = this.page;
  if (!page?.archive) return false;
  if (year) {
    if (month) return page.year === year && page.month === month;
    return page.month === year;
  }
  return Boolean(page.year && page.month);
}

function isCategoryHelper(this: TemplateLocals, category?: any): boolean {
  const page = this.page;
  if (category) return page?.category === category;
  return Boolean(page?.category);
}

function isTagHelper(this: TemplateLocals, tag?: any): boolean {
  const page = this.page;
  if (tag) return page?.tag === tag;
  return Boolean(page?.tag);
}

export {
  isArchiveHelper as archive,
  isCategoryHelper as category,
  isCurrentHelper as current,
  isHomeHelper as home,
  isMonthHelper as month,
  isPageHelper as page,
  isPostHelper as post,
  isTagHelper as tag,
  isYearHelper as year
};

export default function internalIs(hexo: TemplateLocals | Hexo): HexoIs {
  const obj: HexoIs = {
    current: false,
    home: false,
    post: false,
    page: false,
    archive: false,
    year: false,
    month: false,
    category: false,
    tag: false,
    message: 'try using second argument'
  };
  if (!hexo || typeof (hexo as any).page === 'undefined') return obj;
  return {
    current: isCurrentHelper.call(hexo),
    home: isHomeHelper.call(hexo),
    post: isPostHelper.call(hexo),
    page: isPageHelper.call(hexo),
    archive: isArchiveHelper.call(hexo),
    year: isYearHelper.call(hexo),
    month: isMonthHelper.call(hexo),
    category: isCategoryHelper.call(hexo),
    tag: isTagHelper.call(hexo)
  };
}

export interface HexoIs {
  current: boolean;
  home: boolean;
  post: boolean;
  page: boolean;
  archive: boolean;
  year: boolean;
  month: boolean;
  category: boolean;
  tag: boolean;
  message?: string;
}
