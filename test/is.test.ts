import { archive, category, current, home, month, page, post, tag, year } from '../src/is';

describe('Hexo-is helpers', () => {
  const makeLocals = (overrides = {}) => ({
    path: '/index.html',
    page: { __index: true },
    ...overrides
  });

  describe('current', () => {
    it('should match current path strictly', () => {
      const locals = { path: '/foo/bar/index.html' };
      expect(current.call(locals, '/foo/bar/', true)).toBe(true);
      expect(current.call(locals, '/foo/', true)).toBe(false);
    });
    it('should match current path loosely', () => {
      const locals = { path: '/foo/bar/index.html' };
      expect(current.call(locals, '/foo/bar/')).toBe(true);
      expect(current.call(locals, '/foo/')).toBe(true);
      expect(current.call(locals, '/baz/')).toBe(false);
    });
  });

  describe('home', () => {
    it('should detect home page', () => {
      expect(home.call(makeLocals({ page: { __index: true } }))).toBe(true);
      expect(home.call(makeLocals({ page: { __index: false } }))).toBe(false);
    });
  });

  describe('post', () => {
    it('should detect post by layout', () => {
      expect(post.call(makeLocals({ page: { layout: 'post' } }))).toBe(true);
      expect(post.call(makeLocals({ page: { layout: 'page' } }))).toBe(false);
    });
    it('should detect post by __post and _posts', () => {
      expect(post.call(makeLocals({ page: { __post: true, full_source: 'foo/_posts/bar.md' } }))).toBe(true);
      expect(post.call(makeLocals({ page: { __post: true, full_source: 'foo/_other/bar.md' } }))).toBe(false);
    });
  });

  describe('page', () => {
    it('should detect page by layout', () => {
      expect(page.call(makeLocals({ page: { layout: 'page' } }))).toBe(true);
      expect(page.call(makeLocals({ page: { layout: 'post' } }))).toBe(false);
    });
    it('should detect page by __page', () => {
      expect(page.call(makeLocals({ page: { __page: true } }))).toBe(true);
    });
  });

  describe('archive', () => {
    it('should detect archive', () => {
      expect(archive.call(makeLocals({ page: { archive: true } }))).toBe(true);
      expect(archive.call(makeLocals({ page: { archive: false } }))).toBe(false);
    });
  });

  describe('year', () => {
    it('should detect year archive', () => {
      expect(year.call(makeLocals({ page: { archive: true, year: 2025 } }), 2025)).toBe(true);
      expect(year.call(makeLocals({ page: { archive: true, year: 2024 } }), 2025)).toBe(false);
      expect(year.call(makeLocals({ page: { archive: true, year: 2025 } }))).toBe(true);
    });
  });

  describe('month', () => {
    it('should detect month archive', () => {
      expect(month.call(makeLocals({ page: { archive: true, year: 2025, month: 7 } }), 2025, 7)).toBe(true);
      expect(month.call(makeLocals({ page: { archive: true, year: 2025, month: 6 } }), 2025, 7)).toBe(false);
      expect(month.call(makeLocals({ page: { archive: true, year: 2025, month: 7 } }), 7)).toBe(true);
      expect(month.call(makeLocals({ page: { archive: true, year: 2025, month: 7 } }))).toBe(true);
    });
  });

  describe('category', () => {
    it('should detect category', () => {
      expect(category.call(makeLocals({ page: { category: 'foo' } }), 'foo')).toBe(true);
      expect(category.call(makeLocals({ page: { category: 'bar' } }), 'foo')).toBe(false);
      expect(category.call(makeLocals({ page: { category: 'foo' } }))).toBe(true);
    });
  });

  describe('tag', () => {
    it('should detect tag', () => {
      expect(tag.call(makeLocals({ page: { tag: 'foo' } }), 'foo')).toBe(true);
      expect(tag.call(makeLocals({ page: { tag: 'bar' } }), 'foo')).toBe(false);
      expect(tag.call(makeLocals({ page: { tag: 'foo' } }))).toBe(true);
    });
  });
});
