import axios from 'axios'
import store from '@/store'

// import JSONBig from 'json-bigint'

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = store.state.tokenObj.token
    // const token = null

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  // 添加响应拦截器

  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default request
