/**
 * @description 初始化，加载各种
 */
export default async function () {
  try {
    await Promise.all([
      // uni.loadFontFace
    ]);
    uni.reLaunch({ url: '/pages/index/index' });
  } catch {
    uni.reLaunch({ url: '/pages/index/index' });
  }
}
