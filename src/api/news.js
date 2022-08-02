import request  from "@/utils/request";

/** 
 * 获取文章
 * @param {*} channel_id 频道ID
 * @param {*} timestamp   时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳

 * @return  promise 
 * */


export const getArticleAPI = (channelID,timestamp) => {
    return request({
        url:'/v1_0/articles',
        params: {
            channel_id: channelID,
            timestamp
        }
    })
}