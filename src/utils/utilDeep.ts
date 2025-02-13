export default class {
  /**
   * @description 深度克隆
   * @param obj 克隆对象
   * @param cache 对象缓存
   */
  public static deepClone<T>(obj: T, cache = new WeakMap()): T {
    if (obj === null || typeof obj !== 'object') return obj;
    if (cache.has(obj)) return cache.get(obj);
    let clone: any;
    if (obj instanceof Date) {
      clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map(
        Array.from(obj, ([key, value]) => [key, this.deepClone(value, cache)])
      );
    } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, (value) => this.deepClone(value, cache)));
    } else if (Array.isArray(obj)) {
      clone = obj.map((value: any) => this.deepClone(value, cache));
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
      clone = Object.create(Object.getPrototypeOf(obj));
      cache.set(obj, clone);
      Object.entries(obj).forEach(([key, value]) => {
        clone[key] = this.deepClone(value, cache);
      });
    } else {
      clone = Object.assign({}, obj);
    }
    cache.set(obj, clone);
    return clone;
  }

  /**
   * @description 对象深度合并
   * @param target 目标对象
   * @param source 源对象
   */
  public static deepMerge<T extends object, U extends object>(
    target: T = {} as T,
    source: U = {} as U
  ): T & U {
    target = this.deepClone(target);
    if (
      typeof target !== 'object' ||
      target === null ||
      typeof source !== 'object' ||
      source === null
    )
      return target as T & U;
    const merged = (
      Array.isArray(target) ? target.slice() : Object.assign({}, target)
    ) as T & U;
    for (const prop in source) {
      if (!Object.prototype.hasOwnProperty.call(source, prop)) continue;
      const sourceValue = source[prop];
      const targetValue = merged[prop]
        ? merged[prop]
        : Array.isArray(source[prop])
          ? []
          : {};
      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue) as any;
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue) as any;
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue) as any;
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue) as any;
      } else if (typeof sourceValue === 'object' && sourceValue !== null) {
        merged[prop] = this.deepMerge(targetValue, sourceValue) as any;
      } else {
        merged[prop] = sourceValue as any;
      }
    }
    return merged;
  }
}
