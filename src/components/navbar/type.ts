import Navbar from './index.vue';

/**
 * @description 顶部导航组件透明渐变配置
 */
export type NavbarTransparent = {
  /**
   * @description 是否开启透明渐变
   */
  opacityGradient?: boolean;
  /**
   * @description 透明渐变，基于滚动位置计算的透明度系数，当达到此数值不透明
   */
  opacityFactor?: number;
  /**
   * @description 透明渐变，当达到此数值不透明
   */
  opacityFactorMax?: number;
};

/**
 * @description 顶部导航组件props类型
 */
export const navbarProps = {
  /**
   * @description 是否显示顶部导航
   */
  show: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示左侧图标
   */
  showLeftIcon: {
    type: Boolean,
    default: true
  },
  /**
   * @description 顶部导航标题
   */
  title: {
    type: String,
    default:
      useRouter.getCurrentPageConfig().globalStyle?.navigationBarTitleText ?? ''
  },
  /**
   * @description 顶部导航高度，rpx
   */
  height: {
    type: Number
  },
  /**
   * @description 顶部导航左侧图标样式
   */
  iconClass: {
    type: String
  },
  /**
   * @description 顶部导航左侧返回图标
   */
  backIconClass: {
    type: String
  },
  /**
   * @description 顶部导航左侧返回主页图标
   */
  homeIconClass: {
    type: String
  },
  /**
   * @description 顶部导航标题样式
   */
  titleClass: {
    type: String
  },
  /**
   * @description 顶部导航开启fixed定位
   */
  fixed: {
    type: Boolean
  },
  /**
   * @description 顶部导航透明渐变
   */
  navbarTransparentOptions: {
    type: Object as PropType<NavbarTransparent>
  }
} as const;
export type NavbarProps = ExtractPublicPropTypes<typeof navbarProps>;

/**
 * @description 顶部导航组件expose类型
 */
export type NavbarExpose = {
  /**
   * @description 路由栈长度
   */
  routerLength: number;
  /**
   * @description 状态栏高度
   */
  statusBarHeight: number;
  /**
   * @description 顶部导航内容高度
   */
  navbarHeight: number;
  /**
   * @description 顶部导航整体高度
   */
  navbarTotalHeight: number;
};

/**
 * @description 顶部导航组件ref类型
 */
export type NavbarRef = InstanceType<typeof Navbar>;
