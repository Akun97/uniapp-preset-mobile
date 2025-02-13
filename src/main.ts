import { createSSRApp } from 'vue';
import App from './App.vue';
import * as Pinia from 'pinia';
import '@/styles/index.scss';
import '@/styles/icons';
import directivesRegister from '@/directives';
import pluginsRegister from '@/plugins';

export function createApp() {
  const app = createSSRApp(App);
  // 初始化pinia
  useStore.init(app);
  // 注册自定义指令
  directivesRegister(app);
  // 注册插件
  pluginsRegister(app);

  return {
    app,
    Pinia
  };
}
