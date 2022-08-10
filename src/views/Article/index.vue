<template>
  <div class="article-container">
    <!-- //导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="article-detail">
      <h1 class="article-title">{{ article.title }}</h1>
      <van-cell
        class="user-info"
        :title="article.aut_name"
        :label="article.pubdate"
      >
        <template #icon>
          <van-image class="avatar" round :src="article.aut_photo" />
        </template>
        <template #extra>
          <van-button
            class="follow-btn"
            round
            type="info"
            size="small"
            color="#3296fa"
            @click="onFollow"
            v-if="!article.is_followed"
            :loading="isFollowLoading"
            >+关注</van-button
          >
          <van-button
            class="follow-btn"
            round
            type="info"
            size="small"
            v-else
            @click="onFollow"
            :loading="isFollowLoading"
            >已关注</van-button
          >
        </template>
      </van-cell>
      <!-- 文章内容 -->
      <div class="article-content markdown-body" v-html="article.content"></div>

      <van-divider>正文结束</van-divider>
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="showPopup"
        >写评论</van-button
      >
      <van-popup v-model="show" position="bottom" :style="{ height: '15%' }">
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
          autofocus
          border
        >
          <template #extra>
            <van-button type="default">发布</van-button>
          </template>
        </van-field>
      </van-popup>
      <collection :conllects="article"></collection>
    </div>
  </div>
</template>

<script>
import { getArticleListAPI, addFollowAPI, deleteFollowAPI } from '@/api'
import './github-markdown.css'
import collection from "./components/collection.vue"
export default {
  name:'ArticleItem',
  data() {
    return {
      article: {},
      isFollowLoading: false,
      show: false,
      message: ''
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleListAPI({
          artId: this.$route.query.art_id
        })
        console.log(data)
        this.article = data.data
      } catch (error) {
        this.$toast('获取失败')
      }
    },
    async onFollow() {
      this.isFollowLoading = true
      try {
        const authorId = this.article.aut_id
        console.log(authorId)
        if (this.article.is_followed) {
          const { data } = await deleteFollowAPI(authorId)
          this.article.is_followed = false
          console.log(data)
        } else {
          const { data } = await addFollowAPI(authorId)
          this.article.is_followed = true
          console.log(data)
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    },
    showPopup() {
      this.show = true
    }
  },
  components: {
    collection
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  :deep(.article-detail) {
    max-height: calc(100vh - 92px - 88px);
    padding-bottom: 100px;
    padding-top: 50px;
    overflow: auto;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
  .page-nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    :deep(.van-cell__value) {
      background-color: #f5f7f9;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
