<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <!-- 用户选择上传文件 -->
      <input
        type="file"
        hidden
        accept=".png,.jfif,.jpg"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 头像的弹出层 -->
    <van-popup
      class="avator-popup"
      v-model="isShowAvator"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <UpdateAvator :photo="photo" v-if="isShowAvator" @update-avator="userInfo.photo=$event"></UpdateAvator>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvator from './components/UpdateAvator.vue'
import { getUserInfo } from '@/api'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: ''
    }
  },
  components: {
    UpdateAvator
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        //   console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请重试')
      }
    },
    async selectPhoto(e) {
      // //1.获取用户选择的文件对象
      // const file = e.target.files[0]   //伪数组  存用户选择的所有文件
      // // console.log(file);
      // // 2.把file文件对象处理成img标签可识别的url
      // const url = window.URL.createObjectURL(file)
      // console.log(url);
      // // 3.传递url给子组件
      // this.photo = url
      // // 4.清空value，让用户可以重复选组同一张图片
      // e.target.value = ""
      // //   展示弹窗
      // this.isShowAvator = true

      const file = e.target.files[0]
      const url = await resolveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.isShowAvator = true
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.navbar) {
  background-color: #3396fc;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
