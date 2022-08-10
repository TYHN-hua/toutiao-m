<template>
  <!-- 没有图片的格式 -->
  <van-cell
    :title="articleInfo.title"
    :label="label"
    v-if="articleInfo.cover.type === 0"
  />
  <!-- 一张图片的格式 -->
  <van-cell
    :title="articleInfo.title"
    :label="label"
    v-else-if="articleInfo.cover.type === 1"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <!-- 三张图片的格式 -->
  <van-cell :title="articleInfo.title" :label="label" v-else >
    <van-image
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
      width="50"
      height="50"
      :src="item"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      // console.log(art);
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  },
}
</script>

<style></style>
