<template>
  <div style="position: relative">
    <van-image
      width="100%"
      src="	http://110.42.202.109/toutiao/img/banner.d4257372.png"
    />
    <header>
      <div class="login" v-if="isLogin">
        <div class="usermessage">
          <div class="box">
            <van-image
              width="66"
              height="66"
              round
              :src="users.photo"
            />
            <span>{{users.name}}</span>
          </div>
          <van-button class="setUserInfo" round @click="$router.push('/user')" size="mini"
            >编辑资料</van-button
          >
        </div>
        <div class="userconent" width="100%">
          <div class="one">
            <span>{{users.art_count}}</span>
            <span>头条</span>
          </div>
          <div class="one">
            <span>{{users.fans_count}}</span>
            <span>粉丝</span>
          </div>
          <div class="one">
            <span>{{users.follow_count}}</span>
            <span>关注</span>
          </div>
          <div class="one">
            <span>{{users.like_count}}</span>
            <span>获赞</span>
          </div>
        </div>
      </div>
      <div class="no-login" v-else>
        <van-image
          width="66"
          height="66"
          round
          src="data:image/png;base64,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"
        />
        <span @click="$router.push('/login')">登录/注册</span>
      </div>
    </header>

    <main>
      <div>
        <van-grid class="showorhistory">
          <van-grid-item icon="star-o" text="收藏" color="#ed5253" />
          <van-grid-item icon="clock-o" text="历史" color="#ffb31d" />
        </van-grid>
      </div>
    </main>

    <footer>
      <div>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
      <van-button class="logout-btn" v-if="isLogin" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import {getUserInfoAPI} from "@/api"
export default {
  data () {
    return {
      users:{}
    }
  },
  computed: {
    //判断是否登录，就是判断有无Token，显示对应的盒子，根据计算属性
    isLogin() {
      console.log(this)
      return !!this.$store.state.tokenObj.token // !!为转换为布尔值
    }
  },
  created() {
    if (!!this.$store.state.tokenObj.token) {
      this.getMyUserInfo()
    }
  },
  methods: {
    logout() {
      //清楚Token
      this.$store.commit('SET_TOKEN', {})
    },
    async getMyUserInfo() {
      const {data} = await getUserInfoAPI()
      console.log(data);
      this.users = data.data
    }
  }
}
</script>

<style scoped lang="less">
.no-login {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    color: #fff;
    font-size: 40px;
    margin-top: 10px;
  }
}
.showorhistory {
  display: flex;
  justify-content: space-around;
  :deep(.van-icon-star-o::before) {
    color: #ed5253;
  }
  :deep(.van-icon-clock-o) {
    color: #ffb31d;
  }
}
.logout-btn {
  width: 100%;
  // background-color: #fff;
  color: red;
}
.login {
  position: absolute;
  top: 80px;
  width: 100%;
}
.usermessage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom:50px;
  .box {
    display: flex;
    align-items: center;
    margin-left: 20px;
    span {
      margin-left: 40px;
      color:#fff;
      font-size: 40px;
    }
  }
  .setUserInfo {
    margin-right: 30px;
  }
}
.userconent {
  display: flex;
  justify-content: space-around;
  .one {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      color:#fff;
      font-size: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>
