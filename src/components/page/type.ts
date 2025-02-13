import type {
  NavbarProps,
  NavbarTransparent,
  NavbarRef
} from '@/components/navbar/type';
/**
 * @description 页面组件props类型
 */
export const pageProps = {
  /**
   * @description 顶部导航组件props
   */
  navBarOptions: {
    type: Object as PropType<
      Omit<NavbarProps, 'navbarTransparentOptions'> & {
        /**
         * @description 顶部导航开启透明渐变
         */
        navbarTransparentOptions?: Omit<NavbarTransparent, 'opacityFactor'>;
      }
    >
  }
} as const;
export type PageProps = ExtractPublicPropTypes<typeof pageProps>;

/**
 * @description 页面组件expose类型
 */
export type PageExpose = {
  /**
   * @description 顶部导航
   */
  navbarRef: Ref<NavbarRef | undefined>;
  /**
   * @description 视图滚动距离
   */
  currentScrollTop: Ref<number>;
  /**
   * @description 视图刷新状态
   */
  refresherReady: Ref<boolean>;
};
