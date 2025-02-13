/**
 * @description 设置标题栏的背景图平铺方式，可取值："repeat" - 背景图片在垂直方向和水平方向平铺；"repeat-x" - 背景图片在水平方向平铺，垂直方向拉伸；"repeat-y" - 背景图片在垂直方向平铺，水平方向拉伸；"no-repeat" - 背景图片在垂直方向和水平方向都拉伸。 默认使用 "no-repeat"
 */
export const backgroundRepeatType = [
  'repeat',
  'repeat-x',
  'repeat-y',
  'no-repeat'
] as const;
export type BackgroundRepeatType = (typeof backgroundRepeatType)[number];

/**
 * @description tab列表
 */
export interface TabbarListType {
  // 原生属性
  /**
   * @description 页面路径
   */
  pagePath: string;
  /**
   * @description tab 上按钮文字
   */
  text?: string;
  /**
   * @description 图片路径
   */
  iconPath?: string;
  /**
   * @description 选中时的图片路径
   */
  selectedIconPath?: string;
  /**
   * @description 是否显示，默认true
   */
  visible?: boolean;
  // 拓展属性，可在pages.json中对tabBar进行拓展
  /**
   * @description 保持尚亮，激活所有选中效果
   */
  hightlight?: boolean;
  /**
   * @description 图标默认宽度（高度等比例缩放）（优先级大）
   */
  iconWidth?: string;
  /**
   * @description 图标选中宽度（高度等比例缩放）（优先级大）
   */
  selectedIconWidth?: string;
  /**
   * @description tab 上的文字默认颜色（优先级大）
   */
  color?: string;
  /**
   * @description tab 上的文字选中时的颜色（优先级大）
   */
  selectedColor?: string;
  /**
   * @description 文字默认大小（优先级大）
   */
  fontSize?: string;
  /**
   * @description 文字选中大小（优先级大）
   */
  selectedFontSize?: string;
  /**
   * @description 文字默认粗细（优先级大）
   */
  fontWeight?: number;
  /**
   * @description 文字选中粗细（优先级大）
   */
  selectedFontWeight?: number;
  /**
   * @description 文字行高（优先级大）
   */
  lineHeight?: string | number;
  /**
   * @description 文字选中行高（优先级大）
   */
  selectedLineHeight?: string | number;
}

/**
 * @description tabbar配置
 */
export interface TabbarConfig {
  // 原生属性
  /**
   * @description tab 上的文字默认颜色，默认#999999
   */
  color?: string;
  /**
   * @description tab 上的文字选中时的颜色，默认#EEC900
   */
  selectedColor?: string;
  /**
   * @description tab 的背景色，默认#FFFFFF
   */
  backgroundColor?: string;
  /**
   * @description 文字默认大小，默认20rpx
   */
  fontSize?: string;
  /**
   * @description 图标默认宽度（高度等比例缩放），默认59rpx
   */
  iconWidth?: string;
  /**
   * @description 图标和文字的间距，默认6rpx
   */
  spacing?: string;
  /**
   * @description tabBar 默认高度，默认100rpx
   */
  height?: string;
  /**
   * @description 设置背景图片，优先级高于 backgroundColor
   * 本地图：/static/xxx/xxx.png
   * 小程序只支持网络图
   */
  backgroundImage?: string;
  /**
   * @description 设置标题栏的背景图平铺方式，默认no-repeat
   */
  backgroundRepeat?: BackgroundRepeatType;
  /**
   * @description tab列表
   */
  list?: TabbarListType[];
  // 拓展属性，可在pages.json中对tabBar进行拓展
  /**
   * @description 是否有动画效果，用于显示和隐藏，默认true
   */
  animation?: boolean;
  /**
   * @description 用于标记动画是否激活，默认false
   */
  animationAction?: boolean;
  /**
   * @description 文字选中大小，默认20rpx
   */
  selectedFontSize?: string;
  /**
   * @description 图标选中宽度（高度等比例缩放），默认59rpx
   */
  selectedIconWidth?: string;
  /**
   * @description 文字默认粗细，默认400
   */
  fontWeight?: number;
  /**
   * @description 文字选中粗细，默认700
   */
  selectedFontWeight?: number;
  /**
   * @description 文字行高，默认1.2
   */
  lineHeight?: string | number;
  /**
   * @description 文字选中行高
   */
  selectedLineHeight?: string | number;
  /**
   * @description 是否显示，默认true
   */
  show?: boolean;
  /**
   * @description 当前选中tab的index，默认-1
   */
  current?: number;
  /**
   * @description 间距，默认0
   */
  padding?: string;
  /**
   * @description 顶部边框样式，默认1px solid rgba(0, 0, 0, .3)
   */
  borderStyle?: string;
  /**
   * @description 顶部阴影样式，默认0rpx 0rpx 8rpx 1rpx rgba(0, 0, 0, .3)
   */
  boxShadowStyle?: string;
}

/**
 * @description tabbar插件
 */
export interface TabbarPluginType {
  /**
   * @description tabbar配置
   */
  state: TabbarConfig;
  /**
   * @description 显示tabbar
   * @param {TabbarStateKey} key tabbar键值，默认global
   */
  showTabbar: () => void;
  /**
   * @description 隐藏tabbar
   */
  hideTabbar: () => void;
}
