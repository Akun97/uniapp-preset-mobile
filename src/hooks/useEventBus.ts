/**
 * @description 页面通信
 */
export default class {
  /**
   * @description 触发全局自定义事件
   * @param event 事件名
   * @param data 附加参数
   */
  public static emit<T>(event: EventName, data?: T) {
    uni.$emit(event, data);
  }

  /**
   * @description 监听全局的自定义事件
   * @param event 事件名
   * @param callback 回调
   * @param options 配置选项，可配置是否只监听一次
   */
  public static on<T>(
    event: EventName,
    callback: (data: T) => void,
    options: {
      once: boolean;
    } = {
      once: false
    }
  ) {
    if (options.once) {
      uni.$once(event, callback);
    } else {
      uni.$on(event, callback);
    }
  }

  /**
   * @description 移除全局的自定义事件
   * @param event 事件名
   * @param callback 回调
   */
  public static off<T>(event: EventName, callback: (data: T) => void) {
    uni.$off(event, callback);
  }
}
