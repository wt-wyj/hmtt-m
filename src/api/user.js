import request from '@/utils/request.js'

/**
 *
 * @param {String} mobile
 * @param {String} code
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 *
 * @param {String} mobile
 * @returns
 */
export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET',
    data: { mobile }
  })
}
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

export const updateUserPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
export const updateUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
