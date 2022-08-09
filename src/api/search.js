import request from '@/utils/request'

//获取搜索建议接口
export const getSearchSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}


export const getSearchResultAPI = (q,page,per_page) => {
  return request({
    url: '/v1_0/search',
    params: { q,page,per_page }
  })
}