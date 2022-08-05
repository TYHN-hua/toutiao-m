<template>
  <div>
    <!-- 搜索框 -->
    <!-- form的作用: 兼容ios系统,设置action不为空,ios系统输入法显示回车键 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        class="search"
        @search="onSearch"
        @focus="onSerachFocus"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult> -->
    <!-- component动态渲染组件 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch() {
      console.log('触发了 ')
      //用户搜索了，显示搜索结果
      this.isShowSearchResult = true
    },
    onSerachFocus() {
        this.isShowSearchResult = false
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  computed: {
    //每次变化，都重新执行计算属性
    componentName() {
      //如果输入的是空字符串，渲染搜索历史
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      //如果按下回车，渲染搜索结果
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      //如果输入字符，渲染搜索建议
      return 'SearchSuggestion'
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
