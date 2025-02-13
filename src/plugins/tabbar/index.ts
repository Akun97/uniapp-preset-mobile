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
 * @description h5移除默认tabbar
 */
function h5RemoveTabbar() {
  // #ifdef H5
  // 非小程序隐藏tabbar,小程序通过pages.json设置tabBar.custom:true隐藏
  const pageEl = document.querySelector<HTMLElement>('.uni-app--showtabbar');
  const tabbarEl = document.querySelector<HTMLElement>('.uni-tabbar-bottom');
  if (pageEl) {
    pageEl.className = '';
  }
  if (tabbarEl) {
    tabbarEl.style.display = 'none';
  }
  // #endif
}

/**
 * @description 返回tabbar实例
 * @param config pages.json中tabbar配置
 */
export function useTabbarState(config: TabbarConfig = {}): TabbarPluginType {
  if (!instance) {
    instance = createTabbar(config);
  }
  return instance;
}

/**
 * @description tabbar插件，初始化
 */
export default {
  install(app: App, config: TabbarConfig) {
    const tabbarState = useTabbarState(config);
    app.mixin({
      onLaunch() {
        if (
          useRouter
            .getCurrentPageConfig()
            .tabBar?.list.map((item) => item.pagePath)
            .includes(useRouter.getCurrentRoute().substring(1))
        ) {
          h5RemoveTabbar();
        } else {
          uni.addInterceptor('reLaunch', {
            success() {
              h5RemoveTabbar();
              uni.removeInterceptor('reLaunch');
            }
          });
        }
      }
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
} as Plugin<TabbarConfig>;
