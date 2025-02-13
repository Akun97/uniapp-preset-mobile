/**
 * @description api路径字典
 */
const urlDict = {
  demo
};

/**
 * @description 路径类型
 */
export type Urls = {
  [K in keyof typeof urlDict]: `${K & string}.${keyof (typeof urlDict)[K] & string}`;
}[keyof typeof urlDict];

const getUrl = (url: Urls): string => {
  const [module, path] = url.split('.') as [
    keyof typeof urlDict,
    keyof (typeof urlDict)[keyof typeof urlDict]
  ];
  return urlDict[module][path];
};

export default getUrl;
