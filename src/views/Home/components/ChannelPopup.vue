<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>

    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item,index) in myChannels"
        :key="item.id"
        :text="item.name"
        class="mychannel-item"
        :class="{ active: item.name === '推荐' }"
        @click="changeActive(index,item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel',item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels as getAllChannelsAPI } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    //获取所有频道数据（因为没有推荐频道接口，所以用所以频道减去我的频道）
    async getAllChannels() {
      try {
        const { data } = await getAllChannelsAPI()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    changeActive(index,item) {
        if (this.isEdit) {
            if (item.name === '推荐') return
            //删除我的频道
            this.$emit('del-channel',item.id)
        } else {
            // 1.关闭弹窗
            this.$parent.$parent.show = false
            // 2.切换tab
            this.$emit('change-active', index)
        }
    }
  },
  computed: {
    //计算属性：算法：所有频道数组-我的频道数组
    recommendChannels() {
      //最简写法
      return this.allChannels.filter(
        (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
      )
    }
    // filter： flase过滤匹配到的值，删除；  true，加入新数组，遍历完成返回新数组
    //find： 返回的是一个布尔值，满足条件返回true，即找到相同的返回true，所以在取反，让filter过滤掉
    //   this.allChannels.filter((aitem)=> {
    //      return this.myChannels.find((mitem) => {
    //         const results = return !aitem.id == mitem.id
    //     })
    //   })
  }
}
</script>

<style scoped lang="less">
//动态添加类名
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}

.channel {
  padding-top: 1.33333rem;

  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
}
.recommend-item {
  :deep(.van-grid-item__content) {
    flex-direction: row;
    align-items: center;
    background-color: #eee;
  }
  :deep(.van-grid-item__icon) {
    font-size: 40px;
  }
}
:deep(.mychannel-item) {
  .van-grid-item__content {
    position: relative;
  }
  .van-grid-item__icon-wrapper {
    position: unset;
  }
  .van-icon-cross {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 30px;
    transform: translate(45%, -50%);
    border: 2px solid #000;
    border-radius: 50%;
    z-index: 300;
  }
}
</style>
