import type { App } from 'vue';
import type { Pinia } from 'pinia';

/**
 * @description pinia
 */
export default class {
  public static pinia: Pinia;
  public static user: ReturnType<typeof userStore>;

  /**
   * @description 初始化 Pinia 和各个 store 实例
   */
  public static init(app: App) {
    if (!this.pinia) {
      // 创建 Pinia 实例并挂载到应用
      this.pinia = createPinia();
      app.use(this.pinia);

      // 初始化 store 实例并赋值给静态属性
      this.user = userStore();
    }
  }
}
