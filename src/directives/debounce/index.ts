import type { App, DirectiveBinding } from 'vue';

/**
 * @description 防抖
 * @param func 回调函数
 * @param delay 延迟时间
 * @param atOnce 是否立即触发一次
 */
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number,
  atOnce = false
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let once = atOnce;

  return function (...args: Parameters<F>) {
    if (once) {
      func.apply(this, args);
      once = false;
    } else {
      clearTimeout(timeout!);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
  };
}

/**
 * @description 注册指令
 */
export default function (app: App) {
  app.config.globalProperties.$debounce = debounce;
  app.directive('debounce', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      // 解析参数：binding.value 格式应为 [func, delay, atOnce?]
      const [func, delay, atOnce = false] = binding.value;
      const eventType = binding.arg || 'click'; // 支持通过参数指定事件类型

      // 创建防抖处理函数
      const handler = debounce(func, delay, atOnce);
      // 保存处理函数到元素属性以便卸载时使用
      el._debounceHandler = handler;

      // 添加事件监听
      el.addEventListener(eventType, handler);
    },
    unmounted(el: HTMLElement, binding: DirectiveBinding) {
      const eventType = binding.arg || 'click';
      // 使用保存的处理函数进行移除
      el.removeEventListener(eventType, el._debounceHandler);
    }
  });
}
