<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#5094f3"
        show-action
        @search="onSearch"
        @focus="isResultShow = false"
        placeholder="请输入搜索关键词"
        @cancel="$router.back()"
      />
    </form>
    <SearchResult v-if="isResultShow" :keywords="keywords"></SearchResult>

    <SearchSuggestion
      v-else-if="keywords"
      :keywords="keywords"
      @search="onSearch"
    ></SearchSuggestion>

    <SearchHistory
      v-else
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
      @search="onSearch"
    ></SearchHistory>

    <!-- <components :is="componentName" :keywords="keywords"></components> -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
// import { setItem } from '@/utils/storage'

export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },

  computed: {
    // componentName() {
    //   if (this.keywords === '') {
    //     return 'SearchHistory'
    //   } else if (this.isResultShow) {
    //     return 'SearchResult'
    //   } else {
    //     return 'SearchSuggestion'
    //   }
    // }
  },
  data() {
    return {
      keywords: '',
      isResultShow: false,
      searchHistories: JSON.parse(localStorage.getItem('searchHistory')) || []
    }
  },
  // watch: {
  //   searchHistories(value) {
  //     setItem(this.token, value)
  //   }
  // },
  methods: {
    onSearch() {
      console.log(111111)
      // this.keywords = val
      // const index = this.searchHistories.indexOf(val)
      // this.SearchHistory.unshift(this.keyword)

      // if (index !== 1) {
      //   this.searchHistories.splice(index, 1)
      // }
      this.searchHistories.unshift(this.keywords)
      this.isResultShow = true
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(this.searchHistories)
      )
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
