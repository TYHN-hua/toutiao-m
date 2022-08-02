<template>
  <div>
    <van-pull-refresh v-model="refreshLoading" @refresh="loadNextPageArticle">
        <van-list
      v-model="loading"
      @load="loadNextPageArticle"
      offset="0"
      :immediate-check="false"
      :finished="isFinished"
      finished-text="到底了~"
      :error.sync="error"
      error-text="加载文章失败，请点击重新加载"
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
import ArticleItem from '@/components/ArticItem.vue'
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
      refreshLoading: false,
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
      } catch (error) {
        this.$toast.fail('请重新刷新页面获取文章')
      }
    },
    //加载下一页文章
    async loadNextPageArticle() {
      try {
        //1.发送请求
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        // console.log('加载下一页文章');
        const timestamp = data.data.pre_timestamp
        //判断是否加载完毕
        if (timestamp === null) {
          this.isFinished = true
        }
        //2.存储数据     并且下拉刷新
        const results = data.data.results
        if (this.refreshLoading) {
            this.articles.unshift(...results)
        } else {
            this.articles.push(...results)
        }
       
        // this.articles.push(...data.data.results)
        //3.更新时间戳
        this.pre_timestamp = timestamp
        //4.将下一页面加载完成后，设置为false，继续下一次load事件执行
        // this.loading = false
      } catch (error) {
          //错误执行的语句
        this.error = true
      } finally {    //无论成功还是失败，都执行的语句
          this.loading = false
          this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
