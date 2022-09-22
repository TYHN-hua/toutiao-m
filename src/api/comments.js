import request from "@/utils/request"

//获取评论或评论回复
// 评论类型type，a-对文章(article)的评论，c-对评论(comment)的回复
export const getAllComments = ({type,source}) => {
    return request({
      url: '/v1_0/comments',
      params:{
        type:type,
        source:source
      }
    })
  }

//对评论或者回复点赞
export const giveCommentsLike = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    target
  })
}