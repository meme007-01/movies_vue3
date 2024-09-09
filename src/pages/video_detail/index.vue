<template>
  <view style="width: 100%;display: flex;flex-direction: column;background-color: #101012;">
    <!-- transparent -->
    <up-navbar :autoBack="true" bgColor="transparent" height="50">
      <template #center>
        <up-notice-bar fontSize="14" style="margin-left: 60rpx;" height="50" bgColor="transparent" color="#FFF" icon=""
          :text="title"></up-notice-bar>
      </template>
      <template #left>
        <up-icon name="arrow-left" size="26" height="50" color="#FFF"></up-icon>
      </template>
    </up-navbar>

    <view style="width: 100%;height: 300rpx;margin-top: 100rpx;">
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

  import {
    indexStore
  } from "@/store"

  const title = ref("")
  const dp = ref(null)
  const videoData = ref(null)

  const ixStore = indexStore();

  const lines = ref([
    // {
    //   name: 'HD',
    //   url: 'https://api.heimuer.tv/play/f61b006c02704fea8ce0f32edf21dcdd.m3u8',
    //   type: 'hls',
    // },
    // {
    //   name: 'SD',
    //   url: 'https://api.heimuer.tv/play/f61b006c02704fea8ce0f32edf21dcdd.m3u8',
    //   type: 'hls',
    // },
  ])

  onLoad((params) => {
    let item = localStorage.getItem("currentVideo");
    let info = JSON.parse(decodeURIComponent(item));
    console.error(info)
    videoData.value = info;
    title.value = info.title;
  })

  onMounted(() => {
    ixStore.getPlayLine(videoData.value.id).then(res => {
      let newLines = [];
      //根据sort 或者 name 分组,相同的就算作是多条线路处理,有多条的就按名称显示集数
      let dataList = res || [];
      dataList.sort((a, b) => {
        return a.sort - b.sort;
      })

      for (let i = 0; i < dataList.length; i++) {
        let ix = dataList[i].sort - 1;
        if (!newLines[ix]) {
          newLines[ix] = [];
        }
        let info = {
          name: '线路' + (newLines[ix].length + 1),
          url: res[i].file,
          type: 'hls',
        }
        newLines[ix].push(info);
      }

      lines.value = newLines[0];
      initPlayer();
    })

  })

  const initPlayer = () => {
    let dPlayer = new DPlayer({
      container: document.getElementById('player'),
      autoplay: false,
      theme: '#FADFA3',
      loop: false,
      lang: 'zh-cn',
      screenshot: false,
      hotkey: false,
      preload: 'false',
      logo: '', ///static/images/logo.png
      volume: 0.7,
      mutex: false,
      video: {
        quality: lines.value,
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
    dp.value = dPlayer;
  }
</script>

<style>

</style>
