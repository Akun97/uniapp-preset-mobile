import type { App } from 'vue';
import tabbar from './tabbar';
import './tabbar/hideTabbar.scss';

/**
 * @description 注册插件，可能存在参数不同，不做自动化
 */
export default function (app: App) {
  app.use(tabbar, useRouter.getCurrentPageConfig().tabBar);
}
