<template>
  <cover-view
    :class="`ako-tabbar-wrapper safe-area ${state.animationAction && state.animation ? (state.show ? 'ako-tabbar-show' : 'ako-tabbar-hide') : ''}`"
    :style="wrapperStyles"
  >
    <cover-view class="ako-tabbar-content" :style="contentStyles">
      <template v-for="(item, index) in state.list" :key="item.pagePath">
        <template v-if="item.visible">
          <navigator
            :url="`/${item.pagePath}`"
            open-type="switchTab"
            class="navigator"
            hover-class="none"
          >
            <cover-view class="ako-tabbar-item" :style="itemStyles(index)">
              <template v-if="item.iconPath">
                <image
                  class="ako-tabbar-item-icon"
                  :style="iconStyles(index)"
                  mode="widthFix"
                  :src="
                    item.selectedIconPath &&
                    (state.current === index || item.hightlight)
                      ? item.selectedIconPath
                      : item.iconPath
                  "
                ></image>
              </template>
              <cover-view class="ako-tabbar-item-text">
                {{ item.text }}
              </cover-view>
            </cover-view>
          </navigator>
        </template>
      </template>
    </cover-view>
  </cover-view>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { TabbarConfig, TabbarListType } from './type';
import { useTabbarState } from './index';

defineOptions({
  name: 'ako-tabbar',
  options: {
    virtualHost: true,
    addGlobalClass: true
  }
});

// 实例
const { state } = useTabbarState();

/**
 * @description 外层样式
 */
const wrapperStyles = computed(() => {
  const value: CSSProperties = {};
  // 背景
  if (state.backgroundImage) {
    value.backgroundImage = `url('${state.backgroundImage}')`;
    value.backgroundRepeat = state.backgroundRepeat;
  } else {
    value.backgroundColor = state.backgroundColor;
  }
  // 高度
  value.height = state.height;
  // 顶部边框
  value.borderTop = state.borderStyle;
  // 阴影
  value.boxShadow = state.boxShadowStyle;
  return value;
});

/**
 * @description 内层样式
 */
const contentStyles = computed(() => {
  const value: CSSProperties = {};
  // 内间距
  value.padding = state.padding;
  // 高度
  value.height = state.height;
  return value;
});

/**
 * @description 子项样式赋值
 */
function setItemStyle<T>(
  index: number,
  key: keyof (TabbarConfig | TabbarListType)
): T {
  const selectedKey = key.replace(
    /^(.)(.*)$/,
    (_match, firstChar, restOfStr) => {
      return `selected${firstChar.toUpperCase()}${restOfStr}`;
    }
  ) as keyof (TabbarConfig | TabbarListType);
  const item = state.list![index];
  const normal = item[key] ?? state[key];
  const selected = item[selectedKey] ?? state[selectedKey];
  return (
    state.current === index || item.hightlight ? (selected ?? normal) : normal
  ) as T;
}

/**
 * @description 子项样式
 */
const itemStyles = computed(() => (index: number) => {
  const value: CSSProperties = {};
  // 图标和文本间距
  value.rowGap = state.spacing;
  // 字体行高
  value.lineHeight = setItemStyle<typeof value.lineHeight>(index, 'lineHeight');
  // 字体颜色
  value.color = setItemStyle<typeof value.color>(index, 'color');
  // 字体大小
  value.fontSize = setItemStyle<typeof value.fontSize>(index, 'fontSize');
  // 字体粗细
  value.fontWeight = setItemStyle<typeof value.fontWeight>(index, 'fontWeight');
  return value;
});

/**
 * @description 图标样式
 */
const iconStyles = computed(() => (index: number) => {
  const value: CSSProperties = {};
  value.width = setItemStyle<typeof value.width>(index, 'iconWidth');
  return value;
});

/**
 * @description 根据路径更新下标
 */
function tabbarCurrentUpdate() {
  const pages = getCurrentPages();
  const path = pages[pages.length - 1].route;
  state.current = state.list?.findIndex((item) => item.pagePath === path);
}

onShow(() => {
  tabbarCurrentUpdate();
});
</script>

<style scoped lang="scss">
@include safe-area(padding-bottom);

.ako-tabbar {
  &-wrapper {
    @apply relative z-10 box-content w-full;

    will-change: transform, height, padding-bottom;
  }

  &-show {
    @apply overflow-visible;

    box-shadow: v-bind('wrapperStyles.boxShadow');
    border-top: v-bind('wrapperStyles.borderTop');
    animation: show-tabbar ease-in 200ms forwards;
  }

  &-hide {
    @apply overflow-hidden border-none shadow-none;

    animation: hide-tabbar ease-in 200ms forwards;
  }

  &-content {
    @apply w-full;

    :deep(.uni-cover-view) {
      @apply flex;

      .navigator {
        @apply h-full w-full flex-1;
      }
    }
  }

  &-item {
    @apply h-full w-full;

    :deep(.uni-cover-view) {
      @apply flex h-full w-full flex-col items-center justify-center gap-y-[inherit];
    }

    &-icon {
      @apply flex-shrink-0 flex-grow-0;
    }

    &-text {
      line-height: inherit;
      font-size: inherit;
      font-weight: inherit;
    }
  }
}

@keyframes show-tabbar {
  0% {
    transform: translateY(100%);
    height: 0;
    padding-bottom: 0;
    display: block;
  }

  75% {
    transform: translateY(-calc(100% - var(--safe-area-bottom)));
    height: v-bind('wrapperStyles.height');
    padding-bottom: 0;
  }

  100% {
    transform: translateY(0);
    height: v-bind('wrapperStyles.height');
    padding-bottom: var(--safe-area-bottom);
  }
}

@keyframes hide-tabbar {
  0% {
    transform: translateY(0);
    height: v-bind('wrapperStyles.height');
    padding-bottom: var(--safe-area-bottom);
  }

  75% {
    transform: translateY(calc(100% - var(--safe-area-bottom)));
    height: 0;
    padding-bottom: var(--safe-area-bottom);
  }

  99% {
    transform: translateY(100%);
    height: 0;
    padding-bottom: 0;
  }

  100% {
    transform: translateY(100%);
    height: 0;
    padding-bottom: 0;
    display: none;
  }
}
</style>
