<template>
  <view class="page-wrapper flex h-full w-full flex-col">
    <slot name="top">
      <navbar
        ref="navbarRef"
        :show-left-icon="!isTabbarPage"
        v-bind="{
          ...navBarOptions,
          navbarTransparentOptions: {
            ...navBarOptions?.navbarTransparentOptions,
            opacityFactor: currentScrollTop
          }
        }"
      >
        <template v-slot:leftIcon="navbarLeftIconSlot">
          <slot name="navbarLeftIcon" v-bind="navbarLeftIconSlot"></slot>
        </template>
        <template v-slot:rightIcon="navbarRightIconSlot">
          <slot name="navbarRightIcon" v-bind="navbarRightIconSlot"></slot>
        </template>
        <template v-slot:default="navbarDefaultSlot">
          <slot name="navbarDefault" v-bind="navbarDefaultSlot"></slot>
        </template>
      </navbar>
    </slot>

    <view class="page-content h-full flex-1 overflow-hidden">
      <slot></slot>
    </view>

    <slot name="bottom">
      <template v-if="isTabbarPage">
        <tabbar></tabbar>
      </template>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { SetupContext } from 'vue';
import type { NavbarRef } from '@/components/navbar/type';
import { pageProps, type PageExpose } from './type';
import { pageProvideKey } from './provide';

defineOptions({
  name: 'ako-page',
  options: {
    virtualHost: true,
    addGlobalClass: true
  }
});

defineProps(pageProps);

// 页面滚动
const { onScroll, currentScrollTop } = useScroll();
// 获取pages.json，style和globalStyle合并版
const currentPageConfig = useRouter.getCurrentPageConfig();
// 顶部导航栏
const navbarRef = ref<NavbarRef>();
// 内容视图刷新状态
const refresherReady = ref<boolean>(false);
// 插槽
const slots: SetupContext['slots'] = useSlots();
// 底部插槽是否被使用
const hasBottom = ref<boolean>(!!slots.bottom);
// 是否是导航页
const isTabbarPage = ref<boolean>(
  (currentPageConfig.tabBar?.list?.map((item) => item.pagePath) ?? []).includes(
    useRouter.getCurrentRoute().substring(1)
  )
);

// 提供依赖
provide(pageProvideKey, {
  refresherReady,
  hasBottom: readonly(hasBottom),
  isTabbarPage: readonly(isTabbarPage),
  onScroll
});

onUpdated(() => {
  // 更新插槽状态
  hasBottom.value = !!slots.bottom;
});

// 暴露属性
defineExpose<PageExpose>({
  navbarRef,
  currentScrollTop,
  refresherReady
});
</script>
