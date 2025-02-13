/**
 * @description token配置
 */
declare type TokenOptions = {
  /**
   * @description token缓存键值
   */
  tokenname: string;
  /**
   * @description token请求头键值
   */
  HeaderTokenName: string;
  /**
   * @description 登录页路径
   */
  loginPath: string;
  /**
   * @description 未登录提示语
   */
  unLoginMsg: string;
  /**
   * @description 是否开启无感刷新token
   */
  enableRefreshToken: boolean;
};

/**
 * @description 请求配置
 */
declare interface RequestOptions
  extends Omit<UniApp.RequestOptions, 'success' | 'fail' | 'complete'> {
  /**
   * @description 路由
   */
  url: Urls;
  /**
   * @description 是否需要token
   */
  auth?: boolean;
  /**
   * @description 请求数据格式是否是x-www-form-urlencoded
   */
  form?: boolean;
  /**
   * @description post参数是否转成queryString并且拼接到url
   */
  paramString?: boolean;
  success?: (result: any) => void;
  fail?: (result: failResult) => void;
  complete?: () => void;
}

/**
 * @description uniapp请求配置，移除回调
 */
declare type RequestOptionsOmit = Omit<
  UniApp.RequestOptions,
  'success' | 'fail' | 'complete'
>;

/**
 * @description 请求失败回调参数
 */
declare type failResult = { code: number; msg: string };

/**
 * @description 工具类型，用于限制成功、失败、完成回调必须传一个
 */
declare type RequiredOneOf<T> = {
  [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];
