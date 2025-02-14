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

/**
 * @description pages.json globalStyle配置
 */
export type GlobalStyle = Partial<{
  /**
   * @description 导航栏样式，仅支持 \"default\" / \"custom\"\n\n\"custom\" 即取消默认的原生导航栏，详看 [使用注意](https://uniapp.dcloud.net.cn/collocation/pages#customnav)
   */
  navigationStyle: 'default' | 'custom';
  /**
   * @description 导航栏标题文字内容
   */
  navigationBarTitleText: string;
  /**
   * @description 导航栏标题颜色及状态栏前景颜色，仅支持 \"black\" / \"white\"
   */
  navigationBarTextStyle: 'black' | 'white';
  /**
   * @description 导航栏背景颜色（同状态栏背景色），支持 HEX 颜色
   */
  navigationBarBackgroundColor: string;
  /**
   * @description tabBar 上边框样式
   */
  navigationBarShadowStyle: string;
  /**
   * @description 下拉显示出来的窗口的背景色，支持 HEX 颜色
   */
  backgroundColor: string;
  /**
   * @description 下拉 loading 的样式，仅支持 \"black\" / \"white\" / \"none\"
   */
  backgroundTextStyle: 'black' | 'white' | 'none';
  /**
   * @description 底部窗口的背景色（bounce回弹区域）
   */
  backgroundColorBottom: string;
  /**
   * @description 顶部窗口的背景色（bounce回弹区域）
   */
  backgroundColorTop: string;
}>;
