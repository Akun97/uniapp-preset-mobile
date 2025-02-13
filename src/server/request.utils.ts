import { tokenOptions } from '@/config/request.config';
import jsCookie from 'js-cookie';

export class RequestUtils {
  /**
   * @description 重新登录
   */
  public static reLogin() {
    jsCookie.remove(tokenOptions.tokenname);
    const currentRoute = useRouter.getCurrentRoute();
    if (
      tokenOptions.loginPath &&
      currentRoute &&
      !currentRoute.includes(tokenOptions.loginPath)
    ) {
      uni.redirectTo({
        url: `${tokenOptions.loginPath}?targetUrl=${encodeURIComponent(currentRoute)}`,
        success: () => {
          uni.showToast({ title: tokenOptions.unLoginMsg, icon: 'none' });
        }
      });
    }
  }

  /**
   * @description 打开登录页
   */
  public static openLogin() {
    const currentRoute = useRouter.getCurrentRoute();
    if (tokenOptions.loginPath && currentRoute) {
      uni.redirectTo({
        url: `${tokenOptions.loginPath}?targetUrl=${encodeURIComponent(currentRoute)}`
      });
    }
  }

  /**
   * @description 刷新token
   */
  public static refreshToken() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 5000);
    });
  }

  /**
   * @description 拼接参数
   * @param data 请求参数
   */
  public static generateQuerystring(data: any): string {
    let result = '';
    Object.entries(data).forEach(([key, value]) => {
      result += `${key}=${encodeURIComponent(String(value))}&`;
    });
    result = `?${result.substring(0, result.length - 1)}`;
    return result;
  }

  /**
   * @description 页面跳转，做权限判断
   * @param url 目标路径
   */
  public static jumpAuthPage(url: string): void {
    const token = jsCookie.get(tokenOptions.tokenname);
    if (token) {
      if (url.includes('http') || url.includes('weixin')) {
        location.href = url.includes('http') ? url + token : url;
      } else {
        uni.navigateTo({
          url
        });
      }
    } else {
      uni.navigateTo({
        url: `${tokenOptions.loginPath}?targetUrl=${encodeURIComponent(url)}`
      });
    }
  }

  // /**
  //  * @description 表单提交成功返回
  //  * @param msg 返回后提示信息
  //  * @param targetUrl 目标路径
  //  */
  // public static submitBack(): void;
  // public static submitBack(targetUrl: string, msg?: string): void;
  // public static submitBack(targetUrl?: string, msg?: string): void {
  //   let message: string | undefined;
  //   message = msg;
  //   if (targetUrl) {
  //     if (!message) message = '提交成功';
  //     if (tabbarList.map((item) => item.path).includes(targetUrl)) {
  //       uni.switchTab({
  //         url: targetUrl,
  //         success: () => {
  //           if (message) uni.showToast({ title: message, icon: 'success' });
  //         }
  //       });
  //     } else {
  //       if (targetUrl.includes('http') || targetUrl.includes('weixin')) {
  //         uni.navigateBack({
  //           success: () => {
  //             if (message) uni.showToast({ title: message, icon: 'success' });
  //             location.href = targetUrl;
  //           }
  //         });
  //       } else {
  //         uni.redirectTo({
  //           url: targetUrl,
  //           success: () => {
  //             if (message) uni.showToast({ title: message, icon: 'success' });
  //           }
  //         });
  //       }
  //     }
  //   } else {
  //     if (getCurrentPages().length > 1) {
  //       uni.navigateBack({
  //         success: () => {
  //           if (message) uni.showToast({ title: message, icon: 'success' });
  //         }
  //       });
  //     } else {
  //       history.back();
  //       setTimeout(() => {
  //         if (message) uni.showToast({ title: message, icon: 'success' });
  //       }, 0);
  //     }
  //   }
  // }
}
