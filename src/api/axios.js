import axios from 'axios'

const baseURL = 'http://localhost:3300'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.response.use(res => res.data, err => {
  console.log(err, 'network err!')
})

export default axiosInstance