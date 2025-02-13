import {
  baseURL,
  successCode,
  loginExpiredCode,
  statusName,
  messageName,
  tokenOptions,
  defaultOptions
} from '@/config/request.config';
import jsCookie from 'js-cookie';
import { RequestUtils } from './request.utils';

class MyRequest {
  /**
   * @description 当前请求队列
   */
  private queue: Set<string> = new Set();
  /**
   * @@description token刷新状态标记
   */
  private isRefreshing: boolean = false;
  /**
   * @description 等待重新请求队列
   */
  private retryQueue: (() => void)[] = [];

  /**
   * @description 拼接请求配置，用于判读是否有重复请求同时请求
   * @param options 请求配置
   */
  private getKeyOfRequest(options: UniApp.RequestOptions): string {
    let key = options.url;
    if (options.data) key += JSON.stringify(options.data);
    key += `&request_type=${options.method}`;
    return key;
  }

  /**
   * @description 请求
   * @param options 请求配置
   */
  public send<T>(
    options: RequestOptions &
      RequiredOneOf<{
        success: (result: T) => void;
        fail: (result: failResult) => void;
        complete: () => void;
      }>
  ): UniApp.RequestTask;

  public send<T>(
    options: RequestOptions & {
      success?: never;
      fail?: never;
      complete?: never;
    }
  ): Promise<T>;

  public send<T>(
    options: RequestOptions
  ): UniApp.RequestTask | Promise<T> | void {
    const requestBefore = this.interceptorsRequest(options);
    if (!requestBefore) return;
    const config = requestBefore as RequestOptionsOmit;
    if (!options.success && !options.fail && !options.complete) {
      return new Promise<T>(
        (resolve, reject: (e: failResult | Error) => void) => {
          uni
            .request(config)
            .then((result: UniApp.RequestSuccessCallbackResult) => {
              this.interceptorsResponse<T>(
                options,
                config,
                result,
                (e) => resolve(e),
                (e) => reject(e)
              );
            })
            .catch((result: UniApp.GeneralCallbackResult) => {
              uni.showToast({ title: result.errMsg, icon: 'none' });
              reject(Error(result.errMsg));
            });
        }
      );
    } else {
      return uni.request({
        ...config,
        success: (result: UniApp.RequestSuccessCallbackResult) => {
          this.interceptorsResponse<T>(
            options,
            config,
            result,
            (e) => options.success && options.success(e),
            (e) => options.fail && options.fail(e)
          );
        },
        fail: (result: UniApp.GeneralCallbackResult) => {
          uni.showToast({ title: result.errMsg, icon: 'none' });
          if (options.fail) options.fail({ code: -1, msg: result.errMsg });
        },
        complete: () => {
          if (options.complete) options.complete();
        }
      });
    }
  }

  /**
   * @description 请求拦截
   * @param options 请求配置
   */
  private interceptorsRequest(
    options: RequestOptions
  ): RequestOptionsOmit | boolean {
    const clone: RequestOptionsOmit = utilDeep.deepClone(options);
    clone.header = {};
    // 是否需要token
    if (options.auth) {
      const token = jsCookie.get(tokenOptions.tokenname);
      if (token) {
        clone.header[tokenOptions.HeaderTokenName] = token;
      } else {
        RequestUtils.openLogin();
        return false;
      }
    }
    // post请求参数为querystring
    if (options.form) {
      clone.header['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    clone.url = baseURL + apis(options.url);
    // post请求参数拼接在url
    if (options.paramString && clone.data) {
      if (typeof clone.data !== 'object') {
        clone.url += `/${clone.data}`;
      } else {
        clone.url += RequestUtils.generateQuerystring(clone.data);
      }
      delete clone.data;
    }
    // 过滤空数据
    if (typeof clone.data === 'object') {
      clone.data = Object.keys(clone.data).reduce((acc: any, key) => {
        const dataItem = (clone.data as any)[key];
        if (dataItem !== null && dataItem !== undefined && dataItem !== '') {
          acc[key] = dataItem;
        }
        return acc;
      }, {});
    }
    const merge: RequestOptionsOmit = utilDeep.deepMerge(defaultOptions, clone);
    const queueItem = this.getKeyOfRequest(merge);
    if (this.queue.has(queueItem)) {
      throw Error(`禁止重复请求,url:${merge.url}`);
    } else {
      this.queue.add(queueItem);
    }
    return merge;
  }

  /**
   * @description 响应拦截
   * @param sourceOptions 原始请求配置，用于刷新token后重新请求
   * @param options 请求配置
   * @param response 响应结果
   * @param callback 回调
   * @param failCallback 错误回调
   */
  private interceptorsResponse<T>(
    sourceOptions: RequestOptions,
    options: RequestOptionsOmit,
    response: UniApp.RequestSuccessCallbackResult,
    callback: (result: T) => void,
    failCallback: (e: failResult) => void
  ): void {
    this.responseLog(options, response);
    const queueItem = this.getKeyOfRequest(options);
    this.queue.delete(queueItem);
    const { data, statusCode } = response;
    if (statusCode !== 200) {
      uni.showToast({ title: httpCode[statusCode], icon: 'none' });
      failCallback({ code: statusCode, msg: httpCode[statusCode] });
    } else {
      let code =
        typeof data === 'object' &&
        data !== null &&
        (data as AnyObject)[statusName];
      if (successCode.includes(code)) code = 200;
      if (loginExpiredCode.includes(code)) code = 401;
      if (code !== 200) {
        switch (code) {
          case 401:
            if (tokenOptions.enableRefreshToken) {
              this.handleTokenExpired<T>(sourceOptions, callback, failCallback);
            } else {
              RequestUtils.reLogin();
            }
            break;
          default: {
            const msg =
              typeof data === 'object' && data !== null
                ? (data as AnyObject)[messageName]
                : '';
            uni.showToast({
              title: msg,
              icon: 'none'
            });
            failCallback({ code, msg });
            break;
          }
        }
      } else {
        callback(data as T);
      }
    }
  }

  /**
   * @description token过期刷新
   * @param sourceOptions 原始请求选项，用于重新请求
   * @param callback 拦截器成功回调
   * @param failCallback 拦截器失败回调
   */
  private handleTokenExpired<T>(
    sourceOptions: RequestOptions,
    callback: (result: T) => void,
    failCallback: (e: failResult) => void
  ) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      RequestUtils.refreshToken()
        .then(() => {
          this.retryCallback<T>(sourceOptions, callback, failCallback);
          this.retryQueue.forEach((cb) => cb());
          this.retryQueue = [];
        })
        .catch(() => {
          this.retryQueue = [];
          RequestUtils.reLogin();
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    } else {
      this.retryQueue.push(() =>
        this.retryCallback<T>(sourceOptions, callback, failCallback)
      );
    }
  }

  /**
   * @description 重新请求
   * @param sourceOptions 原始请求选项，用于重新请求
   * @param callback 拦截器成功回调
   * @param failCallback 拦截器失败回调
   */
  private retryCallback<T>(
    sourceOptions: RequestOptions,
    callback: (result: T) => void,
    failCallback: (e: failResult) => void
  ) {
    const cloneSource = utilDeep.deepClone(sourceOptions);
    if (cloneSource.success || cloneSource.fail || cloneSource.complete) {
      delete cloneSource.success;
      delete cloneSource.fail;
      delete cloneSource.complete;
    }
    this.send<T>(
      cloneSource as Omit<typeof cloneSource, 'success' | 'fail' | 'complete'>
    )
      .then((result) => callback(result))
      .catch((error) => failCallback(error));
  }

  /**
   * @description 响应日志
   * @param options 请求配置
   * @param response 响应结果
   */
  private responseLog(
    options: RequestOptionsOmit,
    response: UniApp.RequestSuccessCallbackResult
  ) {
    if (import.meta.env.MODE === 'development') {
      const randomColor = `rgba(${[
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255)
      ].join(',')})`;
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      );
      console.log('| 请求地址：', options.url);
      console.log('| 请求参数：', options.data ?? null);
      console.log(
        '| 返回数据：',
        typeof response === 'string' ? response : response.data
      );
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      );
    }
  }

  private static instance: MyRequest;

  /**
   * @description 获取唯一实例
   */
  public static getInstance(): MyRequest {
    if (!this.instance) {
      this.instance = new MyRequest();
    }
    return this.instance;
  }
}

export default MyRequest.getInstance();
