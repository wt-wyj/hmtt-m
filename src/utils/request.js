import axios from 'axios'

// import JSONBig from 'json-bigint'

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
export default request
