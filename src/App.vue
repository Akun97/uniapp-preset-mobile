<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch');
});

onShow(() => {
  console.log('App Show');
  /* #ifdef MP */
  // 小程序更新
  useUpdate();
  /* #endif */
});

onHide(() => {
  console.log('App Hide');
});

onPageNotFound(() => {
  uni.redirectTo({
    url: '/pages/404/index'
  });
});
</script>
