/**
 * @description 自动引入src/styles/icons/下所有的iconfont.css
 */
(function initIcon() {
  const icons = import.meta.glob('./**/iconfont.css');
  for (const key in icons) {
    icons[key]();
  }
})();
