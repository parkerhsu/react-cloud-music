import axios from 'axios'

const LocalServer = 'http://localhost:3300'
const RemoteServer = 'http://47.98.159.95/m-api'

const baseURL = RemoteServer

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.response.use(res => res.data, err => {
  console.log(err, 'network err!')
})

export default axiosInstance