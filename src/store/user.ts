export const userStore = defineStore('user', () => {
  const userInfo = ref<any>();

  return {
    userInfo
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot));
}
