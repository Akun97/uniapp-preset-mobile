import type { App, Plugin } from 'vue';
import type { TabbarPluginType, TabbarConfig } from './type';
import { tabbarConfigDefault, tabbarItemConfigDefault } from './default.config';
/**
 * @description 实例
 */
let instance: TabbarPluginType | null = null;

/**
 * @description 创建tabbar实例
 * @param config pages.json中tabbar配置
 */
function createTabbar(config: TabbarConfig): TabbarPluginType {
  const clone = utilDeep.deepMerge(tabbarConfigDefault, config);
  if (clone.list?.length) {
    clone.list = clone.list.map((element) =>
      utilDeep.deepMerge(tabbarItemConfigDefault, element)
    );
  }
  const state = reactive<TabbarConfig>(clone);

  watch(
    () => state.current,
    () => {
      state.animationAction = false;
    }
  );

  /**
   * @description 显示tabbar
   */
  function showTabbar() {
    if (state.animation) state.animationAction = true;
    state.show = true;
  }

  /**
   * @description 隐藏tabbar
   */
  function hideTabbar() {
    if (state.animation) state.animationAction = true;
    state.show = false;
  }

  return {
    state,
    showTabbar,
    hideTabbar
  };
}

/**
 * @description 返回tabbar实例
 * @param config pages.json中tabbar配置
 */
export function useTabbarState(
  config: TabbarConfig = {
    custom: true
  }
): TabbarPluginType {
  if (!instance) {
    instance = createTabbar(config);
  }
  return instance;
}

/**
 * @description tabbar插件，初始化
 */
export default {
  install(app: App, config?: TabbarConfig) {
    if (config) {
      const tabbarState = useTabbarState(config);
      app.mixin({
        onLaunch() {}
      });
      nextTick(() => {
        // 全局tabbar中要是初始化给定current就跳到对应的tab页
        const globalCurrent = tabbarState.state.current!;
        if (globalCurrent !== -1 && tabbarState.state.list?.length) {
          uni.switchTab({
            url: `/${tabbarState.state.list![globalCurrent].pagePath ?? ''}`
          });
        }
      });
      app.config.globalProperties.$tabbar = tabbarState;
    }
  }
} as Plugin<TabbarConfig | undefined>;
