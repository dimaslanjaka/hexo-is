const { hexoIs } = require('hexo-is');

/**
 * After render HTML filter for Hexo.
 *
 * This function is triggered after rendering HTML content.
 *
 * @this {import('hexo')}
 */
function after_render_html(content, data) {
  hexo.log.info('dump hexo-is(this)', hexoIs(this));
  hexo.log.info('dump hexo-is(data)', hexoIs(data));
  return content;
}

hexo.extend.filter.register('after_render:html', after_render_html, 1);
