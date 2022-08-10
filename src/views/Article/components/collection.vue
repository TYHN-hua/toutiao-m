<template>
  <div class="box">
    <van-icon name="comment-o" :info="conllects.comm_count" color="#777" />
    <van-icon
      :name="conllects.is_collected ? 'star' : 'star-o'"
      :color="conllects.is_collected ? '#ffa500' : ''"
      @click="clickCollect"
    />
    <van-icon
      :color="conllects.attitude == 1 ? 'red' : ''"
      :name="conllects.attitude == 1 ? 'good-job' : 'good-job-o'"
      @click="clickPraise"
    />
    <van-icon name="share" color="#777777"></van-icon>
  </div>
</template>

<script>
import {
  addCollectionAPI,
  delCollectionAPI,
  addpraiseAPI,
  delpraiseAPI
} from '@/api'
export default {
  props: {
    conllects: {
      type: Object,
      required: true
    }
  },
  methods: {
    async clickCollect() {
      this.loading = true
      try {
        if (this.conllects.is_collected) {
          await delCollectionAPI(this.conllects.art_id)
          // console.log(data)
          this.conllects.is_collected = false
        } else {
          await addCollectionAPI(this.conllects.art_id)
          // console.log(data)
          this.conllects.is_collected = true
        }
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    },
    async clickPraise() {
      this.loading = true
      try {
        if (this.conllects.attitude == 1) {
          await delpraiseAPI(this.conllects.art_id)
          // console.log(data);
          this.conllects.attitude = -1
        } else {
          await addpraiseAPI(this.conllects.art_id)
          // console.log(data);
          this.conllects.attitude = 1
        }
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
        this.loading = false
      }
    }
  }
}
</script>

<style>
.box {
  width: 382px;
  height: 46px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
