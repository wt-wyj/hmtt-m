<template>
  <div class="channel">
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        @click="changeActive(index, item)"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
      >
        <template #icon>
          <van-icon
            name="cross"
            v-show="isEdit && item.name !== '推荐'"
          ></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel',item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannelAPI()
  },
  methods: {
    changeActive(index, item) {
      if (this.isEdit) {
        if (item.name === '推荐') return
        this.$emit('del-channel', item.id)
      } else {
        this.$emit('close')
        this.$emit('change-active', index)
      }
    },
    async getAllChannelAPI() {
      const { data } = await getAllChannel()
      this.allChannels = data.data.channels
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(
        (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
      )
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;

    &.van-button--default {
      border-color: red;
    }
  }
  .recommend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      align-items: center;
    }
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
    :deep(.van-grid-item__text) {
      margin-top: 0.05rem;
    }
  }
  :deep(.mychannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
