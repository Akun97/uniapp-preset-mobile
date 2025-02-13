import type { ComponentInternalInstance } from 'vue';

/**
 * @description 处理滚动事件
 */
export default function () {
  const systemInfo = uni.getSystemInfoSync();
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  const currentScrollTop = ref<number>(0);

  /**
   * @description 滚动事件回调
   * @param e 事件参数
   */
  function onScroll(event: UniHelper.ScrollViewOnScrollEvent) {
    currentScrollTop.value = event.detail.scrollTop;
  }

  /**
   * @description 是否在视窗之内
   * @param selector 节点选择器
   */
  function isInView(selector: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const windowHeight = systemInfo.windowHeight;
        uni
          .createSelectorQuery()
          .in(proxy)
          .select(selector)
          .boundingClientRect((data: UniApp.NodeInfo | UniApp.NodeInfo[]) => {
            resolve(
              (data as UniApp.NodeInfo).top! - currentScrollTop.value <=
                windowHeight
            );
          })
          .exec();
      } catch {
        reject(Error(`检测不到节点：${selector}`));
      }
    });
  }

  return {
    currentScrollTop,
    onScroll,
    isInView
  };
}
