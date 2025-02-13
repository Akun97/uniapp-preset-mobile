// 根据实际情况修改
/**
 * @deprecated 事件类型
 */
declare type EventGroups = {
  EventGroup1: { demo1: string; demo2: string };
  EventGroup2: { demo2: string };
};
declare type EventName = {
  [K in keyof EventGroups]: `${K}.${keyof EventGroups[K] & string}`;
}[keyof EventGroups];
