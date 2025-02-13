import pages from '@/pages.json';
/**
 * @description 路由相关
 */
export default class {
  /**
   * @description 获取当前路径
   */
  public static getCurrentRoute() {
    let currentRoute;
    /* #ifdef MP */
    currentRoute = `/${getCurrentPages()[0].route}`;
    /* #endif */
    /* #ifdef APP-PLUS || H5 */
    const hash = window.location.hash;
    const queryIndex =
      hash.indexOf('?') === -1 ? hash.length : hash.indexOf('?');
    currentRoute = hash.substring(hash.indexOf('#') + 1, queryIndex);
    /* #endif */
    if (currentRoute === '/') {
      currentRoute = '/pages/launch/index';
    }
    return currentRoute;
  }

  /**
   * @description 获取当前页面的pages.json配置，合并了页面style和globalStyle
   */
  public static getCurrentPageConfig() {
    const pagesJSON: Partial<typeof pages> = pages;
    const currentPath = this.getCurrentRoute().substring(1);
    const currentStyle: any = [
      ...(pagesJSON.pages ?? []),
      ...(pagesJSON.subPackages?.reduce(
        (all, acc: any) => all.concat(acc.pages),
        []
      ) ?? [])
    ]?.find((page) => page.path === currentPath)?.style;
    pagesJSON.globalStyle ??= {} as any;
    Object.assign(pagesJSON.globalStyle!, currentStyle);
    return pagesJSON;
  }
}
