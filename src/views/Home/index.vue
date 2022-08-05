<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- 频道-->
    <!-- 频道弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPopup
        :myChannels="myChannels"
        @close="show = false"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></ChannelPopup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannel,
  addChannel,
  setMyChannelsToLocal,
  getMyChannelsByLocal
} from '@/api'
import ArticleList from '@/views/Home/components/ArticleList'
import ChannelPopup from '@/views/Home/components/ChannelPopup'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelPopup
  },
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.initMyChannels()
  },
  methods: {
    initMyChannels() {
      if (this.isLogin) {
        //用户登陆了
        this.getMyChannel()
      } else {
        //用户未登录
        const myChannels = getMyChannelsByLocal()
        if (myChannels) {
          //本地存储有mycahnnels数据，从本地拿myChannels
          this.myChannels = myChannels
        } else {
          //本地存储没有mycahnnels数据，获取默认的myChannels
          this.getMyChannel()
        }
      }
    },
    async getMyChannel() {
      try {
        const { data } = await getMyChannelAPI()

        this.myChannels = data.data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    //删除我的频道
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannel(id)
        } else {
          setMyChannelsToLocal(newChannels)
        }
        this.myChannels = newChannels
        // 1.删除服务器上的数据
        // 2.删除页面上的数据，让他实时更新
        this.$toast.success('删除频道成功')
      } catch (error) {
        this.$toast.fail('删除频道失败~')
      }
    },
    //添加频道
    // console.log('addChannel被触发了');
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannels.length)
        }  else {
          setMyChannelsToLocal([...this.myChannels,channel])
        }
        this.myChannels.push(channel)
        this.$toast.success('添加频道成功')
      } catch (error) {
        this.$toast.fail('添加频道失败~')
      }
    }
  }
}
</script>

<style scoped lang="less">
//搜索栏样式
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//导航样式
// .van-tab__pane {
// 符号的两侧必须由空格(100vh默认为一页的高度)
// max-height: calc(100vh - 92px - 88px - 100px);
// }
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
