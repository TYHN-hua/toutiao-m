<template>
  <div>
    <van-image
      width="100%"
      src="	http://110.42.202.109/toutiao/img/banner.d4257372.png"
    />
    <header>
      <div class="login" v-if="isLogin">
        <button @click="$router.push('/user')">编辑资料</button>
      </div>
      <div class="no-login" v-else>未登录的
        <div>图片</div>
        <h2>dengl</h2>
      </div>
    </header>

    <main>
      收藏、历史
      <button @click="$router.push('/login')">登录</button>
    </main>

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
      console.log(this)
      return !!this.$store.state.tokenObj.token // !!为转换为布尔值
    }
  },
  methods: {
    logout() {
      //清楚Token
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
