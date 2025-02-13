import Decimal from 'decimal.js';
type calcParam = string | number;

export default class {
  /**
   * @description 加法
   * @param val1 加数
   * @param val2 加数
   * @returns {number}
   */
  public static add(val1: calcParam, val2: calcParam): number {
    const value1 = Number(val1);
    const value2 = Number(val2);
    if (!Number.isNaN(value1) && !Number.isNaN(value2)) {
      return Number(new Decimal(value1).add(new Decimal(value2)));
    } else {
      throw Error('参数错误');
    }
  }

  /**
   * @description 减法
   * @param val1 被减数
   * @param val2 减数
   * @returns {number}
   */
  public static sub(val1: calcParam, val2: calcParam): number {
    const value1 = Number(val1);
    const value2 = Number(val2);
    if (!Number.isNaN(value1) && !Number.isNaN(value2)) {
      return Number(new Decimal(value1).sub(new Decimal(value2)));
    } else {
      throw Error('参数错误');
    }
  }

  /**
   * @description 乘法
   * @param val1 乘数
   * @param val2 乘数
   * @returns {number}
   */
  public static mul(val1: calcParam, val2: calcParam): number {
    const value1 = Number(val1);
    const value2 = Number(val2);
    if (!Number.isNaN(value1) && !Number.isNaN(value2)) {
      return Number(new Decimal(value1).mul(new Decimal(value2)));
    } else {
      throw Error('参数错误');
    }
  }

  /**
   * @description 除法
   * @param val1 被除数
   * @param val2 除数
   * @returns {number}
   */
  public static div = (val1: calcParam, val2: calcParam): number => {
    const value1 = Number(val1);
    const value2 = Number(val2);
    if (Number.isNaN(value1) || Number.isNaN(value2) || value2 === 0) {
      throw Error('参数错误');
    } else {
      return Number(new Decimal(value1).div(new Decimal(value2)));
    }
  };
}
