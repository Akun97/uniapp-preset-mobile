/**
 * @description page组件提供的依赖key
 */
export const pageProvideKey = Symbol() as InjectionKey<PageProvide>;

/**
 * @description page组件提供的依赖类型
 */
export type PageProvide = {
  /**
   * @description 底部插槽是否被使用
   */
  hasBottom: Ref<boolean>;
  /**
   * @description 是否是导航页
   */
  isTabbarPage: Ref<boolean>;
  /**
   * @description 页面内容视图刷新状态
   */
  refresherReady: Ref<boolean>;
  /**
   * @description 监听页面滚动
   */
  onScroll: (event: UniHelper.ScrollViewOnScrollEvent) => void;
};
