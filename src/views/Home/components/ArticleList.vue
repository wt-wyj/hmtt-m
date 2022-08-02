<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loatNextPageArticle"
      success-text="刷新文章成功"
    >
      <van-list
        v-model="loading"
        @load="loatNextPageArticle"
        offset="33"
        :immediate-check="false"
        :finished="isFinished"
        :error.sync="error"
        error-text="加载失败，点击重新加载"
        finished-text="没有更多文章了~"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (e) {
        this.$toast.fail('请刷新重新获取文章')
      }
    },
    async loatNextPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        if (timestamp === null) {
          this.isFinished = true
        }
        const results = data.data.results
        if (this.refreshLoading) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }

        this.pre_timestamp = timestamp
        console.log(data)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
