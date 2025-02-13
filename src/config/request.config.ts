/**
 * @description 接口地址
 */
export const baseURL: string = process.env.VITE_REQUEST_URL as string;

/**
 * @description 请求成功状态码
 */
export const successCode = [200, 0, '200', '0', null, undefined] as const;

/**
 * @description 登录失效状态码
 */
export const loginExpiredCode = [401] as const;

/**
 * @description 状态码字段名
 */
export const statusName: string = 'code';

/**
 * @description 信息字段名
 */
export const messageName: string = 'msg';

/**
 * @description token信息配置
 */
export const tokenOptions: TokenOptions = {
  tokenname: 'my-token',
  HeaderTokenName: 'Authorization',
  loginPath: '/pages/login/index',
  unLoginMsg: '暂未登录或登录过期，请重新登录',
  enableRefreshToken: true
};

/**
 * @description 请求默认配置
 */
export const defaultOptions: UniApp.RequestOptions = {
  url: '',
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 120000,
  method: 'GET'
};
