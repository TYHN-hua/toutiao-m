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
      <UpdateAvator
        :photo="photo"
        v-if="isShowAvator"
        @update-avator="userInfo.photo = $event"
      ></UpdateAvator>
    </van-popup>
    <!-- 修改昵称 -->
    <van-cell
      title="昵称"
      :value="myName"
      is-link
      @click="showPopup"
    ></van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        left-arrow
        @click-left="show = false"
        @click-right="onClickRight"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        show-word-limit
      />
    </van-popup>
    <!-- 修改性别 -->
    <van-cell
      title="性别"
      :value="myGender"
      is-link
      @click="showGender"
    ></van-cell>
    <van-popup
      v-model="gendershow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        confirm-button-text="保存"
        cancel-button-text="取消"
        :columns="columns"
        :default-index="userInfo.gender"
        @cancel="gendershow = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 修改生日 -->
    <van-cell
      title="生日"
      :value="mybirthday"
      is-link
      @click="isbirthday"
    ></van-cell>
    <van-popup
      v-model="isShowUpdateBirthdy"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        confirm-button-text="保存"
        cancel-button-text="取消"
        @cancel="isShowUpdateBirthdy = false"
        @confirm="ondata"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateAvator from './components/UpdateAvator.vue'
import { getUserInfo, setUserInfo } from '@/api'
import { resolveToBase64, getData } from '@/utils'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: '',
      show: false,
      gendershow: false,
      message: '',
      columns: ['男', '女'],
      isShowUpdateBirthdy: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17)
    }
  },
  components: {
    UpdateAvator
  },
  created() {
    //获取用户信息
    this.getUserInfo()
  },
  methods: {
    //获取用户信息
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请重试')
      }
    },
    //更换头像
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
    },
    //昵称弹窗
    showPopup() {
      this.show = true
      this.message = this.userInfo.name
    },
    //性别弹窗
    showGender() {
      this.gendershow = true
    },
    // 生日弹窗
    isbirthday() {
      this.isShowUpdateBirthdy = true
    },
    //保存性别
    async onConfirm(value, index) {
      try {
        const res = await setUserInfo(index)
        this.$toast.success('更改成功')
        this.gendershow = false
        console.log(value)
        this.userInfo.gender = index
      } catch (error) {
        this.$toast.success('更改失败')
      }
    },
    //保存昵称
    async onClickRight() {
      try {
        const res = await setUserInfo(this.message)
        this.$toast.success('更改成功')
        this.show = false
        this.userInfo.name = this.message
      } catch (error) {
        this.$toast.success('更改失败')
      }
    },
    //保存生日
    async ondata(value) {
      try {
        const time = getData(value)
        // console.log(time);
        const res = await setUserInfo(time)
        this.$toast.success('更换成功')
        this.isShowUpdateBirthdy = false
        this.userInfo.birthday = time
      } catch (error) {
        this.$toast.success('更改失败')
      }
    }
  },
  computed: {
    //页面动态显示昵称
    myName() {
      return this.userInfo.name
    },
    //页面动态显示性别
    myGender() {
      // 判断男女状态：男为0，女为1
      if (this.userInfo.gender === 1) {
        return '女'
      } else {
        return '男'
      }
    },
    //页面动态显示生日
    mybirthday() {
      return this.userInfo.birthday
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
