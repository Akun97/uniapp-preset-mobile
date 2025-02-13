import type { App } from 'vue';
import pages from '@/pages.json';
import tabbar from './tabbar';

/**
 * @description 注册插件，可能存在参数不同，不做自动化
 */
export default function (app: App) {
  app.use(tabbar, pages.tabBar);
}
