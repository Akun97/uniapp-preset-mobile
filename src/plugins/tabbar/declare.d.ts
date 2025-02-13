import type { TabbarPluginType } from './type';

declare module 'vue' {
  interface ComponentCustomProperties {
    $tabbar: TabbarPluginType;
  }
}
