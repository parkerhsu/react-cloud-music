import axios from 'axios'

const baseURL = 'http://47.98.159.95/m-api'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.response.use(res => res.data, err => {
  console.log(err, 'network err!')
})

export default axiosInstance