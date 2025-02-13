<template>
  <page
    :nav-bar-options="{
      titleClass: 'font-bold',
      fixed: true,
      navbarTransparentOptions: {
        opacityGradient: true,
        opacityFactorMax: 300
      }
    }"
  >
    <content class="bg-white" refresher-enabled>
      <view class="h-[300rpx] w-full bg-yellow-500"></view>
      <view class="h-[300rpx] w-full bg-blue-500"></view>
      <view class="h-[300rpx] w-full bg-green-500"></view>
      <view class="h-[300rpx] w-full bg-gray-500"></view>
      <view class="h-[300rpx] w-full bg-black"></view>
      <view class="h-[300rpx] w-full bg-slate-500"></view>
      <view class="h-[300rpx] w-full bg-pink-500"></view>
      <view class="h-[300rpx] w-full bg-lime-500"></view>
    </content>
  </page>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
