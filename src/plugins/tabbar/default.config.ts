import type { TabbarConfig, TabbarListType } from './type';

export const tabbarConfigDefault: TabbarConfig = {
  color: '#999999',
  selectedColor: '#EEC900',
  backgroundColor: '#FFFFFF',
  fontSize: '20rpx',
  iconWidth: '59rpx',
  spacing: '6rpx',
  height: '100rpx',
  backgroundRepeat: 'no-repeat',
  animation: true,
  animationAction: false,
  selectedFontSize: '20rpx',
  selectedIconWidth: '59rpx',
  fontWeight: 400,
  selectedFontWeight: 700,
  lineHeight: 1.2,
  show: true,
  current: -1,
  padding: '0',
  borderStyle: '1px solid rgba(0, 0, 0, .3)',
  boxShadowStyle: '0rpx 0rpx 8rpx 1rpx rgba(0, 0, 0, .3)'
};

/**
 * @description tabbar列表项默认配置
 */
export const tabbarItemConfigDefault: TabbarListType = {
  pagePath: '',
  visible: true
};
