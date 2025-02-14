module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss' // 配置 vue 中 scss 样式格式化
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml'
  ],
  rules: {
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'deep']
      }
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', '/^uni-/']
      }
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx']
      }
    ],
    'declaration-property-value-no-unknown': null,
    'font-family-no-missing-generic-family-keyword': null, // 关闭禁止字体系列中缺少通用系列关键字。
    'value-keyword-case': null, // 在css中使用 v-bind，不报错。
    'no-descending-specificity': null, // 关闭禁止在覆盖更高特异性的选择器之后使用较低特异性的选择器。
    'selector-class-pattern': null, // 关闭强制选择器类名的格式。
    'property-no-unknown': null, // 关闭不允许未知属性。
    'media-feature-name-no-vendor-prefix': null, // 关闭不允许在媒体功能名称中使用供应商前缀。
    'at-rule-no-vendor-prefix': null, // 关闭禁止在规则中使用供应商前缀。
    'selector-no-vendor-prefix': null, // 关闭不允许选择器使用供应商前缀。
    'value-no-vendor-prefix': null, // 关闭不允许使用供应商前缀作为值。
    'property-no-vendor-prefix': null, // 关闭不允许属性使用供应商前缀。
    'scss/dollar-variable-pattern': null, // 关闭强制变量名的格式。
    'scss/at-mixin-pattern': null, // 关闭强制 Sass/SCSS 的混合名称的格式。
    'scss/at-import-partial-extension': null, // 关闭@use中不包含.scss扩展名。
    'scss/load-partial-extension': null, // 关闭@import中不包含.scss扩展名
    'color-function-notation': null, // 关闭为颜色函数指定现代或传统的符号。
    'alpha-value-notation': null, // 关闭指定 alpha 值的百分比或数字符号。
    'no-empty-source': null, // 关闭禁止空内容。
    'no-duplicate-selectors': null, // 关闭不允许重复的选择器。
    'length-zero-no-unit': null // 关闭值为0不用带单位
  }
};
