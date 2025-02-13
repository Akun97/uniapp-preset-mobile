import type { App } from 'vue';

/**
 * @description 自动注册指令
 */
export default function (app: App) {
  const directives = import.meta.glob<(app: App) => void>('./**/index.ts', {
    import: 'default',
    eager: true
  });
  for (const key in directives) {
    directives[key](app);
  }
}
