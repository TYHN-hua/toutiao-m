<template>
  <div class="resultsList">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      loading-text="加载中。。。"
      :error.sync="error"
      error-text="加载文章失败，请点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :value="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      results: [],
      page: 1,
      per_page: 20,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        console.log('继续加载下一页')
        const { data } = await getSearchResultAPI(
          this.keywords,
          this.page,
          this.per_page
        )
        this.results.push(...data.data.results)
        this.loading = false
        //判断是否加载完毕
        if (data.data.results.length > 0) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.resultsList {
 height: 1226px;
 overflow: auto;
}</style>
