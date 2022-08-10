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

// 获取文章详情
export const getArticleListAPI = ({artId}) => {
    return request({
        url:`/v1_0/articles/${artId}`
    })
}

//收藏文章
export const addCollectionAPI = (articleId) => {
    return request({
        url: '/v1_0/article/collections',
        method: 'POST',
        data: {
            target:articleId
        }
    })
}

//取消收藏文章
export const delCollectionAPI = (target) => {
    return request({
        url: `/v1_0/article/collections/${target}`,
        method: 'DELETE'
    })
}

// 对文章点赞
export const addpraiseAPI = (articleId) => {
    return request({
        url: '/v1_0/article/likings',
        method: 'POST',
        data: {
            target:articleId
        }
    })
}
// 取消文章的点赞
export const delpraiseAPI = (target) => {
    return request({
        url: `/v1_0/article/likings/${target}`,
        method: 'DELETE'
    })
}