<template>
  <div class="search-result">
    <van-list
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
    >
      <van-cell v-for="item in list" :key="item.id">
        {{ item.title }}
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],

      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  computed: {},
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchResult()
      }
    }
  },
  created() {},
  mounted() {},

  methods: {
    getSearchResult: debounce(async function () {
      try {
        const { data } = await getSearchResultAPI(this.keywords)
        console.log(data)
        this.list = data.data.results
        console.log(this.list)
        this.$toast.success('加载成功')
      } catch (error) {
        this.$toast.fail('获取失败')
      }
    }, 300)
  }
}
</script>

<style scoped lang="less"></style>
