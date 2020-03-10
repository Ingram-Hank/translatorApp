

import axios from 'axios';

let root = process.env.NODE_ENV === 'development' ? `https://www.hitranslator.com/ht` : `https://www.hitranslator.com/ht`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const apiAxios = (method, url, params) => {
  return axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null,
    baseURL: root,
    timeout: 100000,
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    withCredentials: false
  })
}

export default {
  get: (url, params) => {
    return apiAxios('GET', url, params)
  },
  post: (url, params) => {
    return apiAxios('POST', url, params)
  },
  put: (url, params) => {
    return apiAxios('PUT', url, params)
  },
  delete: (url, params) => {
    return apiAxios('DELETE', url, params)
  },
}