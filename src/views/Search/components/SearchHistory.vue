<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon name="delete-o" v-if="delshow" @click="delHistory"/>
      <div v-else>
        <span @click="delAll">全部删除</span>
        <span @click="btn">完成</span>
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in historys"
      :key="index"
      @click="clickHistory(index)"
    >
    <van-icon name="close" v-if="show" @click="delone(index)"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() { 
    return {
      historys: [],
      delshow: true,
      show:false,
    }
  },
  created() {
    if(localStorage.getItem("SearchHistory") != null) {
      const history = localStorage.getItem('SearchHistory').split(',') 
      this.historys = history
    }
  },
  methods: {
    clickHistory(i) {
      const historytext = this.historys[i]
      this.$emit('sent', historytext)
    },
    delHistory() {
      this.delshow = false
      this.show = true
    },
    btn() {
      this.delshow = true
      this.show = false
    },
    delAll() {
      localStorage.removeItem('SearchHistory')
      this.historys=[]
    },
    delone(i) {
      this.historys.splice(i,1)
      localStorage.setItem('SearchHistory',this.historys)
    }
  }
}
</script>

<style></style>
