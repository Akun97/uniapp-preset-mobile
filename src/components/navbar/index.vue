<template>
  <view
    v-show="show"
    :class="`navbar-wrapper z-10 w-full transition-[background-color] ${fixed ? 'pointer-events-none fixed left-0 top-0' : 'relative'}`"
    :style="{
      height: `${getHeight()}px`,
      paddingTop: `${statusBarHeight}px`,
      boxShadow:
        alpha === 1
          ? (currentPageConfig.globalStyle?.navigationBarShadowStyle ??
            '0 0 8rpx 1rpx rgba(0, 0, 0, .3)')
          : 'none',
      backgroundColor: colorToRgba(
        currentPageConfig.globalStyle?.navigationBarBackgroundColor ??
          '#FFFFFF',
        alpha
      )
    }"
  >
    <view class="navbar-content relative flex h-full w-full items-center">
      <template v-if="showLeftIcon">
        <view
          class="navbar-left-icon pointer-events-auto absolute left-0 top-0 z-20"
          :style="{
            width: `${navbarHeight()}px`,
            height: `${navbarHeight()}px`
          }"
        >
          <slot name="leftIcon" :alpha="alpha">
            <view
              class="flex h-full w-full items-center justify-center"
              @click="back"
            >
              <template v-if="routerLength != 1">
                <view
                  :class="`${backIconClass ?? 'AkoIcon ako-fanhui1'} ${iconClass ?? ''}`"
                ></view>
              </template>
              <template v-else>
                <view
                  :class="`${homeIconClass ?? 'AkoIcon ako-home'} ${iconClass ?? ''}`"
                ></view>
              </template>
            </view>
          </slot>
        </view>
      </template>
      <template v-if="hasRightIcon">
        <view
          class="navbar-right-icon pointer-events-auto absolute right-0 top-0 z-20"
          :style="{
            width: `${navbarHeight()}px`,
            height: `${navbarHeight()}px`
          }"
        >
          <slot name="rightIcon" :alpha="alpha"></slot>
        </view>
      </template>
      <slot :title="title" :alpha="alpha">
        <text
          :class="`w-full text-center ${titleClass ?? ''}`"
          :style="{ opacity: alpha }"
        >
          {{ title }}
        </text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { SetupContext } from 'vue';
import { navbarProps, type NavbarExpose } from './type';

defineOptions({
  name: 'ako-navbar',
  options: {
    virtualHost: true,
    addGlobalClass: true
  }
});

const props = defineProps(navbarProps);

// 获取pages.json，style和globalStyle合并版
const currentPageConfig = useRouter.getCurrentPageConfig();
// 标题
const title = ref<string>();
// 系统信息
const systemInfo = uni.getSystemInfoSync();
// 状态栏高度
const statusBarHeight: number = systemInfo.statusBarHeight ?? 0;
// 路由栈长度，用于判断是返回上一页还是首个导航页
const routerLength = getCurrentPages().length;
// 转为rgba
const colorToRgba = (color: string, alpha: number) =>
  utilColor.colorToRgba(color, alpha);
// rpx转px
const rpx2px = uni.upx2px;
// 背景透明度
const alpha = computed(() => {
  return props.navbarTransparentOptions?.opacityGradient
    ? (props.navbarTransparentOptions?.opacityFactor ?? 0) /
        rpx2px(props.navbarTransparentOptions?.opacityFactorMax ?? 0)
    : 1;
});
// 插槽
const slots: SetupContext['slots'] = useSlots();
// 右侧图标插槽是否被使用
const hasRightIcon = ref<boolean>(!!slots.rightIcon);

watch(
  () => props.title,
  (text) => {
    title.value =
      text ?? currentPageConfig.globalStyle?.navigationBarTitleText ?? '';
  },
  {
    immediate: true
  }
);

// 内容高度
function navbarHeight(): number {
  let height;
  /* #ifdef MP */
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
  height = menuButtonInfo.height + (menuButtonInfo.top - statusBarHeight) * 2;
  /* #endif */
  /* #ifdef APP-PLUS || H5 */
  height = 44;
  /* #endif */
  return props.height ? uni.upx2px(props.height) : height;
}

// 获取整体高度
function getHeight(): number {
  return navbarHeight() + statusBarHeight;
}

// 返回
function back() {
  if (routerLength !== 1) {
    uni.navigateBack();
  } else {
    if (
      currentPageConfig.tabBar?.list &&
      currentPageConfig.tabBar?.list.length
    ) {
      uni.switchTab({
        url: `/${currentPageConfig.tabBar?.list[0].pagePath}`
      });
    }
  }
}

onUpdated(() => {
  // 更新插槽状态
  hasRightIcon.value = !!slots.rightIcon;
});

// 暴露属性
defineExpose<NavbarExpose>({
  routerLength,
  statusBarHeight,
  navbarHeight: navbarHeight(),
  navbarTotalHeight: getHeight()
});
</script>
