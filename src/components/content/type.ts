/**
 * @description 内容组件props类型
 */
export const contentProps = {
  /**
   * @description 是否适配底部安全区
   */
  safeArea: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否滚动
   */
  scroll: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否开启下拉刷新
   */
  refresherEnabled: {
    type: Boolean,
    default: false
  }
} as const;
export type ContentProps = ExtractPublicPropTypes<typeof contentProps>;
