<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      @click="getSuggest(index)"
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
      suggestions: [],
      title:"",
      text:"",
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
    // 普通写法：函数要发请求，还要防抖，尽量避免，让一个函数只完成一个功能
    // 可引入第三方包lodash，单独进行防抖，写法如下：
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsAPI(this.keywords)
        // console.log(data);
        // this.suggestions = data.data.options.filter((str)=>Boolean(str))
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取建议失败')
      }
    }, 300),
    async getSuggest(i) {
      this.text = this.suggestions[i]
      this.$emit('send',this.text)
    }
  },
  //对请求进行深度监听
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
