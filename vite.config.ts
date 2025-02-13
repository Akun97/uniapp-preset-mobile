import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { isH5, isApp } from '@uni-helper/uni-env';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';
import Components from '@uni-helper/vite-plugin-uni-components';
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite';
import postcssPlugins from './postcss.config';

const vitePlugins = [
  AutoImport({
    imports: ['vue', 'uni-app', 'pinia', 'date-fns'],
    ignore: ['createApp'],
    dirs: [
      'src/hooks',
      'src/server',
      'src/server/apis/**',
      'src/store',
      'src/utils'
    ],
    eslintrc: {
      enabled: true
    }
  }),
  Components({
    dirs: ['src/components', 'src/plugins']
  }),
  uni(),
  uvtw({
    rem2rpx: true,
    disabled: isH5 || isApp,
    // 使用新的 ast-grep 来处理 js 资源，速度是 babel 的2倍左右
    // 需要先安装 `@ast-grep/napi`, 安装完成后再启用下方配置
    jsAstTool: 'ast-grep',
    // 类名压缩与混淆
    mangle: true
  })
];

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  return defineConfig({
    plugins: vitePlugins,
    define: {
      'process.env': loadEnv(mode, process.cwd())
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 路径别名
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    },
    css: {
      // css预处理
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/mixin.scss";
          `
        }
      },
      postcss: {
        plugins: postcssPlugins
      }
    },
    server: {
      proxy: {
        '/api-prefix-dev': {
          target: 'htts://0.0.0.0',
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-prefix-dev/, '')
        }
      }
    }
  });
};
