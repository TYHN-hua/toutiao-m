import request from '@/utils/request'
import storage from '@/utils/storage'
//获取我的频道
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
//获取所有频道
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
//删除用户的频道
export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
//添加用户频道
export const addChannel = (id,seq) => {
  return request({
    url: "/v1_0/user/channels",
    method: 'PATCH',
    data: {
      channels: [{id,seq}]   //seq：用户频道的索引值
    }
  })
}

//封装本地存储我的频道--用于未登录的用户使用
const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS,myChannels)
}

export const getMyChannelsByLocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}