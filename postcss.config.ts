import type { AcceptedPlugin } from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
// import postcssPxtransform from 'postcss-pxtransform';
import cssMacro from 'weapp-tailwindcss/css-macro/postcss';

const plugins: AcceptedPlugin[] = [tailwindcss(), autoprefixer()];

// 可以使用 postcss-pxtransform 来进行 px 转 rpx 的功能
// plugins.push(
//   postcssPxtransform({
//     platform: 'weapp',
//     // 根据你的设计稿宽度进行配置
//     // 可以传入一个 function
//     // designWidth (input) {
//     //   if (input.file.replace(/\\+/g, '/').indexOf('@nutui/nutui-taro') > -1) {
//     //     return 375
//     //   }
//     //   return 750
//     // },
//     designWidth: 750, // 可以设置为 375 等等来应用下方的规则,
//     deviceRatio: {
//       640: 2.34 / 2,
//       // 此时应用到的规则，代表 1px = 1rpx
//       750: 1,
//       828: 1.81 / 2,
//       // 假如你把 designWidth 设置成 375 则使用这条规则 1px = 2rpx
//       375: 2 / 1
//     }
//   })
// );

plugins.push(cssMacro as AcceptedPlugin);

export default plugins;
