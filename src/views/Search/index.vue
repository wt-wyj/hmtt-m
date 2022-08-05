<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#5094f3"
        show-action
        @search="onSearch"
        @focus="onSearchFocus"
        placeholder="请输入搜索关键词"
        @cancel="$router.back()"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestions></SearchSuggestions> -->
    <components :is="componentName" :keywords="keywords"></components>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestions from './components/SearchSuggestions.vue'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestions
  },

  computed: {
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      } else if (this.isShowSearchResult) {
        return 'SearchResult'
      } else {
        return 'searchSuggestions'
      }
    }
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch() {
      console.log(111111)
      this.isShowSearchResult = true
    },
    onSearchFocus() {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
