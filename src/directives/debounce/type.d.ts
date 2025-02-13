import { debounce } from './index';

declare global {
  interface HTMLElement {
    _debounceHandler: (...args: any[]) => void;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $debounce: typeof debounce;
  }
}
