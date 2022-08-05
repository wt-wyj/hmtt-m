import request from '@/utils/request'

export const getSearchSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
