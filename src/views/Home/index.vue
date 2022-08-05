<template>
  <div>
    <van-nav-bar class="navbar" fixed>
      <template #title>
        <van-button
          class="search-btn"
          icon="search"
          round
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"> </span>
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '100%' }"
        closeable
        close-icon-position="top-left"
        ><ChannelPopup
          :myChannels="myChannels"
          @change-active="active = $event"
          @del-channel="delChannel"
          @close="show = false"
          @add-channel="addChannel"
        ></ChannelPopup
      ></van-popup>
    </van-tabs>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannel,
  addChannel,
  getMyChannelsByLocal,
  setMyChannelsToLocal
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  created() {
    this.initMyChannels()
  },
  components: {
    ArticleList,
    ChannelPopup
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    initMyChannels() {
      if (this.isLogin) {
        this.getMyChannel()
      } else {
        const myChannels = getMyChannelsByLocal()
        if (myChannels) {
          this.myChannels = myChannels
        } else {
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
          getMyChannelsByLocal(newChannels)
        }
        this.myChannels = newChannels
        this.$toast.success('删除频道成功')
      } catch (e) {
        this.$toast.fail('删除频道失败')
      }
    },
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.myChannels.length)
        } else {
          setMyChannelsToLocal([...this.myChannels, channel])
        }
        this.myChannels.push(channel)
        console.log(channel.id)
        this.$toast.success('添加频道成功')
      } catch (error) {
        this.$toast.fail('添加频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-tab__pane {
  // 符号的两侧必须由空格
  min-height: calc(100vh - 92px - 88px - 100px);
}

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

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  margin-bottom: 88px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;
    // padding-bottom: 20px;

    /* tab标签 */
    .van-tab {
      border: 2px solid #eee;

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
:deep(.toutiao-gengduo1) {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  z-index: 999;
  // opacity: 0.6;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  position: fixed;
  top: 92px;
  right: 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('../../assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
