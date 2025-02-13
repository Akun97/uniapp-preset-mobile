import type { App, DirectiveBinding } from 'vue';

/**
 * @description 节流，一定会触发最后一次
 * @param func 回调函数
 * @param delay 延迟时间
 */
export function throttle<F extends (...args: any[]) => void>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let lastTime: number = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args) {
    const now: number = Date.now();
    const timeSinceLastCall: number = now - lastTime;
    if (!timeout && timeSinceLastCall >= delay) {
      func.apply(this, args);
      lastTime = now;
    } else {
      clearTimeout(timeout!);
      timeout = setTimeout(() => {
        func.apply(this, args);
        lastTime = now;
        timeout = null;
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * @description 注册指令
 */
export default function (app: App) {
  app.config.globalProperties.$throttle = throttle;
  app.directive('throttle', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const [func, delay] = binding.value;
      const eventType = binding.arg || 'click'; // 支持通过参数指定事件类型

      // 创建节流处理函数
      const handler = throttle(func, delay);
      // 保存处理函数到元素属性以便卸载时使用
      el._throttleHandler = handler;

      // 添加事件监听
      el.addEventListener(eventType, handler);
    },
    unmounted(el: HTMLElement, binding: DirectiveBinding) {
      const eventType = binding.arg || 'click';
      // 使用保存的处理函数进行移除
      el.removeEventListener(eventType, el._throttleHandler);
    }
  });
}
