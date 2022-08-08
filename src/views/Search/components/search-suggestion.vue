<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highlightSuggestions"
      :key="index"
    >
      <template #title> <span v-html="item"></span></template
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsAPI(this.keywords)
        // console.log(data)
        this.suggestions = data.data.options
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取失败')
      }
    }, 300)
  },
  computed: {
    highlightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((item) =>
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style></style>
