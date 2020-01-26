import originAxios, { AxiosResponse } from 'axios';
import { message } from 'antd';

const axios = originAxios.create({
  // baseURL: '',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },
  timeout: 8000
})
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


axios.interceptors.response.use(
  function(response: AxiosResponse) {
    if (response.data && response.data.errcode !== 0) {
      /*
        successful response:
        {"status": 0, msg: "", data: ""}

        unsuccessful response:
        {"status": 1, msg: "", data: ""}
      */
      let errorMsg = response.data.msg;
      message.error(errorMsg);

      return Promise.reject(errorMsg);
    }
    return response.data;
  },
  function(error: Error) {
    return Promise.reject(error)
  }
)
const http = {
  get(url: string, data: any = {}) {
    return axios.get(url, {
      params: data
    })
  },

  post(url: string, data: any = {}) {
    return axios({
      method: 'post',
      url,
      data
    })
  },

  put(url: string, data: any = {}) {
    return axios({
      method: 'put',
      url,
      data
    })
  },

  delete(url: string, data: any = {}) {
    return axios({
      method: 'delete',
      url,
      data
    })
  }
}

export default http;