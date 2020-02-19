

import axios from 'axios';
import { queryString } from '../utilities';
// import qs from 'querystring';

let root = process.env.NODE_ENV === 'development' ? `http://liyao-305623587.picp.io/ht/` : `http://127.0.0.1:3001/api`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const apiAxios = (method, url, params) => {
  return axios({
    method: method,
    url: method === 'GET' || method === 'DELETE' ? queryString(url, params) : url,
    data: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null,
    baseURL: root,
    timeout: 10000,
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