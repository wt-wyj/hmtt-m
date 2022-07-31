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
