<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in highlightSuggestions"
      :key="index"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
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
  methods: {
    //获取搜索建议
    // 做防抖：1，延迟执行  2，干掉上一次的定时器
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsAPI(this.keywords)
        // console.log(data);
        // this.suggestions = data.data.options.filter((str)=>Boolean(str))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取建议失败')
      }
    }, 300)
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  computed: {
    //动态正则
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
