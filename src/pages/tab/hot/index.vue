<template>
  <!-- #101012 -->
  <view style="width: 100%;background-color:101012;display: flex;flex-direction: column;">

    <!-- 此处为了让reload时不自动滚动到顶部，需要设置auto-clean-list-when-reload和auto-scroll-to-top-when-reload为false，即在reload时关闭自动清空数组和自动滚动到顶部 -->
    <z-paging ref="paging" v-model="dataList" :loading-more-enabled="false" :auto-scroll-to-top-when-reload="false"
      @query="queryList">

      <up-image :show-loading="true" src="/static/images/hot/rb_bg.webp" width="100%" height="150px"
        @click="click"></up-image>
      <!-- 小程序中直接修改组件style为position: sticky;无效，需要在组件外层套一层view -->
      <view
        style="z-index: 100;position: sticky;top :0;background: url(/static/images/hot/rb_bg.webp); background-size: 100% 100%;">
        <!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
        <up-tabs scrollable="false" style="width: 100%; background-color: #101012;" :list="tabList" lineWidth="15"
          lineColor="#00cdff" :activeStyle="{
      	                color: '#FFF',
      	                fontWeight: 'bold',
      	                transform: 'scale(1.05)'
      	            }" :inactiveStyle="{
      	                color: '#AAA',
      	                transform: 'scale(1)'
      	            }" itemStyle="padding-left: 20px; padding-right: 20px; height: 50px;">
        </up-tabs>
        <up-tabs scrollable="false" style=" background-color: #101012;" :list="subTabList" lineWidth="15"
          lineColor="#00cdff" :activeStyle="{
      	              color: '#ff743d',
      	              fontWeight: 'bold',
      	              transform: 'scale(1.05)'
      	          }" :inactiveStyle="{
      	              color: '#AAA',
      	              transform: 'scale(1)'
      	          }" itemStyle="padding-left: 20px; padding-right: 20px; height: 50px;">
        </up-tabs>
      </view>

      <view style="margin: 20px 15px;
      display: flex;flex-direction: row;justify-content: space-between">
        <view style="width: 32%;height: 240px;display: flex;flex-direction: column;" v-for="(item,ix) in topMovieList"
          :key="ix">
          <view style="width: 100%;height: 180px;border-radius: 4px;
              background: url(/static/data/images/video/000b3486bbc4df3747414c90173d168c_SZJ.jpeg);
              background-size: 100% 100%;">
            <view v-bind:style="{'background-color':getTopBgColor(ix),'color':getTopTitleColor(ix)}" style="font-weight: bold; font-size: 12px; width: 18px;
            height: 18px;line-height: 18px; text-align: center;border-radius: 4px;">
              {{ix+1}}
            </view>
          </view>
          <view style="margin-top: 5px; color: #FFF;font-weight: bold;font-size: 20px;height: 30px;line-height: 30px;">
            {{item.title}}
          </view>
          <view style="color: #888;font-size: 14px;height: 24px;line-height: 24px;">{{item.year}}年</view>
          <view style="color: #888;font-size: 14px;height: 24px;line-height: 24px;">{{item.catory}}</view>
        </view>
      </view>
      <view style="color: #FFF;margin: 30px 15px;">
        <view style="display: flex;flex-direction: row;margin-bottom: 15px;" v-for="(item,ix) in subMovieList"
          :key="ix">
          <view style="width: 140px;height: 180px;border-radius: 4px;
              background: url(/static/data/images/video/000b3486bbc4df3747414c90173d168c_SZJ.jpeg);
              background-size: 100% 100%;">
            <view v-bind:style="{'background-color':'rgb(0,0,0,0.6)','color':'#FFF'}" style="font-weight: bold; font-size: 12px; width: 18px;
            height: 18px;line-height: 18px; text-align: center;border-radius: 4px;">
              {{ix+4}}
            </view>
          </view>
          <view style="margin-left: 10px;">
            <view style="color: #FFF;font-weight: bold;font-size: 20px;height: 30px;line-height: 30px;">{{item.title}}
            </view>
            <view style="color: #888;font-size: 14px;height: 24px;line-height: 24px;">{{item.year}}年</view>
            <view style="color: #888;font-size: 14px;height: 24px;line-height: 24px;">{{item.catory}}</view>
          </view>
        </view>


      </view>

    </z-paging>


  </view>
</template>

<script setup>
  import {
    ref
  } from "vue";
  const dataList = ref([]);

  // @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
  const queryList = (pageNo, pageSize) => {
    // 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
    // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
    // 模拟请求服务器获取分页数据，请替换成自己的网络请求
    //paging.value.complete([21, 3, 3, 3, 3, 4]);
  }

  const tabList = ref([{
      name: '电影'
    },
    {
      name: '电视剧'
    },
    {
      name: '综艺'
    },
    {
      name: '动漫'
    }
  ]);

  const subTabList = ref([{
      name: '周榜'
    },
    {
      name: '月榜'
    },
    {
      name: '年榜'
    }
  ]);

  const topMovieList = ref([{
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }]);
  const subMovieList = ref([{
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }, {
    title: "默杀",
    year: 2004,
    catory: "犯罪*悬疑"
  }]);

  // 定义方法
  function click(item) {
    console.log('item', item);
  }

  const getTopBgColor = (index) => {
    let color;
    if (index < 1) {
      color = "#ff0073";
    } else if (index < 2) {
      color = "#ff9056";
    } else {
      color = "#f7c4a8";
    }
    return color;
  }
  const getTopTitleColor = (index) => {
    let color;
    if (index < 2) {
      color = "#FFF";
    } else {
      color = "#964e27"
    }
    return color;
  }
</script>

<style lang="scss" scoped>

</style>
