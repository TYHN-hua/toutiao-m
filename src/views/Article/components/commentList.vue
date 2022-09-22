<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in comments" :key="index" :title="item.aut_name">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px">{{item.pubdate}}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" :color="comments.is_liking ? 'red':''" name="like-o" @click="likeBtn"/>
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getAllComments,giveCommentsLike } from '@/api'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      offset: null,
      limit: 10,
      comments: [],
      totalCount: 0
    }
  },
  methods: {
    async onLoad() {
      //   console.log(this.source)
      try {
        const { data } = await getAllComments({
          type: 'a',
          source: this.$route.query.art_id,
          offset: this.offset,
          limit: this.limit
        })
        const {results} = data.data
        console.log(data)
        this.comments.push(...results)
        this.totalCount = data.data.total_count
        this.loading = false
        if (results.length <= 0) {
          this.offset = data.data.last_id
        } else {
            this.finished = true
        }
      } catch (error) {
        // this.error = true
      }
    },
    async likeBtn() {
        try {
            const {data} = await giveCommentsLike(this.comments.com_id)
            console.log(data);
        } catch (error) {
            
        }
    }
  }
}
</script>

<style scoped lang="less">
 .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>
