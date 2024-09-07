<template>
  <view style="width: 100%;display: flex;flex-direction: column;background-color: #101012;">
    <!-- transparent -->
    <up-navbar :autoBack="true" bgColor="transparent" height="50">
      <template #center>
        <up-notice-bar fontSize="14" style="margin-left: 60rpx;" height="50" bgColor="transparent" color="#FFF" icon=""
          text="你好了"></up-notice-bar>
      </template>
      <template #left>
        <up-icon name="arrow-left" size="26" height="50" color="#FFF"></up-icon>
      </template>
    </up-navbar>

    <view style="width: 100%;height: 400rpx;margin-top: 100rpx;">
      <div id="player" style="width: 100%;height: 400rpx;background-color: aliceblue;"></div>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from 'vue';
  import DPlayer from 'dplayer';


  onMounted(() => {
    const dp = new DPlayer({
      container: document.getElementById('player'),
      autoplay: false,
      theme: '#FADFA3',
      loop: false,
      lang: 'zh-cn',
      screenshot: false,
      hotkey: false,
      preload: 'auto',
      logo: '', ///static/images/logo.png
      volume: 0.7,
      mutex: false,
      video: {
        quality: [{
            name: 'HD',
            url: 'https://api.heimuer.tv/play/f61b006c02704fea8ce0f32edf21dcdd.m3u8',
            type: 'hls',
          },
          {
            name: 'SD',
            url: 'https://api.heimuer.tv/play/f61b006c02704fea8ce0f32edf21dcdd.m3u8',
            type: 'hls',
          },
        ],
        defaultQuality: 0,
        pic: 'static/images/banner/banner1.jpg',
        thumbnails: 'static/images/banner/banner1.jpg'
      },
      pluginOptions: {
        hls: {
          // hls config
        },
      },
      // subtitle: {
      //   url: 'dplayer.vtt',
      //   type: 'webvtt',
      //   fontSize: '25px',
      //   bottom: '10%',
      //   color: '#b7daff',
      // },
      // danmaku: {
      //   id: '9E2E3368B56CDBB4',
      //   api: 'https://api.prprpr.me/dplayer/',
      //   token: 'tokendemo',
      //   maximum: 1000,
      //   addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],
      //   user: 'DIYgod',
      //   bottom: '15%',
      //   unlimited: true,
      //   speedRate: 0.5,
      // },
      // contextmenu: [{1234567890aZ@#$%^
      //     text: 'custom1',
      //     link: 'https://github.com/DIYgod/DPlayer',
      //   },
      //   {
      //     text: 'custom2',
      //     click: (player) => {
      //       console.log(player);
      //     },
      //   },
      // ],
      // highlight: [{
      //     time: 20,
      //     text: '这是第 20 秒',
      //   },
      //   {
      //     time: 120,
      //     text: '这是 2 分钟',
      //   },
      // ],
    });
  })
</script>

<style>

</style>
