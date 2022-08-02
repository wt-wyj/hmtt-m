<template>
  <div>
    <van-cell-group>
      <van-cell
        v-if="articleInfo.cover.type === 0"
        :title="articleInfo.title"
        :label="label"
      />

      <van-cell
        v-else-if="articleInfo.cover.type === 1"
        :title="articleInfo.title"
        value="内容"
        :label="label"
      >
        <van-image
          width="100%"
          height="100%"
          :src="articleInfo.cover.images[0]"
        ></van-image>
      </van-cell>

      <van-cell v-else :title="articleInfo.title" :label="label">
        <van-image
          v-for="(item, index) in articleInfo.cover.images"
          :key="index"
          width="50"
          height="50"
          :src="item"
        ></van-image
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
