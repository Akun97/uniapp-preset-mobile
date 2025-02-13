/** @type {import('prettier').Config} */
/**
 * 配置选项参考：
 * https://prettier.io/docs/en/options
 * https://github.com/tailwindlabs/prettier-plugin-tailwindcss
 */
module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  endOfLine: 'auto',
  trailingComma: 'none',
  printWidth: 80,
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'ignore',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindAttributes: [], // 自定义属性名称内对class进行排序
  tailwindFunctions: ['clsx', 'cva', 'tw'], // 使用clsx、cva、twrnc等这些库时对class进行排序
  tailwindPreserveWhitespace: false, // 是否保留class周围的任何空格
  tailwindPreserveDuplicates: false // 是否保留重复类
};
