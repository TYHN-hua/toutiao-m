<template>
  <div>
    <header>
      <div class="login" v-if="isLogin">登录后的</div>
      <div class="no-login" v-else>未登录的</div>
    </header>

    <main>收藏、历史</main>

    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    //判断是否登录，就是判断有无Token，显示对应的盒子，根据计算属性
    isLogin() {
      return !!this.$store.state.tokenObj.token     // !!为转换为布尔值
    }
  },
  methods: {
    logout() {
      //清楚Token
      this.$store.commit('SET_TOKEN',{})
    }
  }
}
</script>

<style>

</style>