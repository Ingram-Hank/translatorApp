

import axios from 'axios'
import {queryString} from '../utilities';
import qs from 'querystring';

let root = process.env.NODE_ENV === 'development'? `http://localhost:3001/api`:`http://127.0.0.1:3001/api`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function apiAxios(method, url, params, token) {
  return axios({
    method: method,
    url: method === 'GET'|| method === 'DELETE' ? queryString(url,params) : url,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    baseURL: root,
    timeout: 10000,
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: false
  })
}

export default {
  get: function (url, params, token) {
    return apiAxios('GET', url, params, token)
  },
  post: function (url, params, token) {
    return apiAxios('POST', url, params, token)
  },
  put: function (url, params, token) {
    return apiAxios('PUT', url, params, token)
  },
  delete: function (url, params, token) {
    return apiAxios('DELETE', url, params, token)
  },
}