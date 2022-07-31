<template>
  <div>
    <van-nav-bar title="登录" />

    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        name="mobile"
        v-model="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span slot="left-icon" class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        name="code"
        v-model="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span slot="left-icon" class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            native-type="button"
            class="send-code-btn"
            size="mini"
            round
            v-if="isShowCode"
            @click="sendCode"
          >
            获取验证码
          </van-button>
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button
          class="login-btn"
          round
          block
          type="info"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { codeRules, mobileRules } from './rules'
import { login, getSmsCode } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      //   console.log('submit', values)
      try {
        this.loading()
        //连续解构对象
        // 结构赋值
        //  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
        //  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
        //  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
        //  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        this.$store.commit('SET_TOKEN', token) //调用vuex的方法

        //跳转到profile
        this.$router.push('/my')
        this.$toast.success('登录成功')
        // console.log(res)
      } catch (error) {
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      // 1.验证手机号
      this.$refs.form.validate('mobile').then(async () => {
        // loading
        this.loading()

        try {
          // 2. 发送请求
          await getSmsCode(this.mobile)

          this.$toast.success('获取验证码成功')

          // 3. 显示倒计时
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status

          let message = '手机号不正确'

          if (status === 429) {
            message = error.response.data.message
          }

          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
.toutiao {
  font-size: 40px;
}
.send-code-btn {
  background-color: #eee;
  color: #917b66;
}
</style>
