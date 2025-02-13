import { throttle } from './index';

declare global {
  interface HTMLElement {
    _throttleHandler: (...args: any[]) => void;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $throttle: typeof throttle;
  }
}
