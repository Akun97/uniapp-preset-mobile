<template>
  <scroll-view
    class="content-wrapper h-full w-full"
    :scroll-y="scroll"
    :refresher-enabled="refresherEnabled"
    :refresher-default-style="
      (currentPageConfig.globalStyle
        ?.backgroundTextStyle as UniHelper.ScrollViewRefresherDefaultStyle) ??
      'black'
    "
    :refresher-background="
      currentPageConfig.globalStyle?.backgroundColor ?? '#FFFFFF'
    "
    :refresher-triggered="refresherTriggered"
    @refresherrefresh="refresh"
    @refresherpulling="refresherReady = true"
    @refresherrestore="refresherReady = false"
    @refresherabort="
      refresherTriggered = false;
      refresherReady = false;
    "
    @scrolltolower="loadmore"
    @scroll="onScroll"
  >
    <view
      :class="`content-content flex w-full flex-col ${scroll ? 'min-h-full' : 'h-full'}`"
    >
      <view :class="`${scroll ? 'min-h-0 flex-1' : ''}`">
        <slot></slot>
      </view>
      <template v-if="!hasBottom && !isTabbarPage && safeArea">
        <view class="safe-area w-full"></view>
      </template>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { pageProvideKey } from '@/components/page/provide';
import { contentProps } from './type';

defineOptions({
  name: 'ako-content',
  options: {
    virtualHost: true,
    addGlobalClass: true
  }
});

defineProps(contentProps);

const emit = defineEmits<{
  refresh: [];
  loadmore: [];
}>();

// page组件提供
const { hasBottom, isTabbarPage, refresherReady, onScroll } =
  inject(pageProvideKey)!;
// 获取pages.json，style和globalStyle合并版
const currentPageConfig = useRouter.getCurrentPageConfig();
// 内容视图刷新状态
const refresherTriggered = ref<boolean>(false);

// 刷新事件
function refresh(): void {
  if (!refresherTriggered.value) {
    refresherTriggered.value = true;
    emit('refresh');
    setTimeout(() => {
      refresherTriggered.value = false;
    }, 500);
  } else {
    refresherTriggered.value = false;
  }
}

// 上拉加载
function loadmore(): void {
  emit('loadmore');
}
</script>

<style scoped lang="scss">
@include safe-area(height);
</style>
