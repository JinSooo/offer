import axios from 'axios'
import qs from 'qs'
import { getUserId } from './cookie'

// 服务器网址
axios.defaults.baseURL = 'http://127.0.0.1:4000/api/private/v1/'
// 配置请求头
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 设置post数据
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    // 请求附带userId
    config.headers['Authorization'] = getUserId() || ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * get
 * @param {String} url api
 */
export const get = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => reject(err))
  })
}

/**
 * post
 * @param {String} url api
 * @param {Object} data 数据
 */
export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => reject(err))
  })
}
