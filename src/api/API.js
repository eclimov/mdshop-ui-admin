import axios from 'axios'
import store from '@/plugins/store'
import { API_PATH_REFRESH_TOKEN } from '@/api/auth'

const apiUrl = process.env.VUE_APP_API_URL || ''

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    Accept: 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getters['user/accessToken']
    if (accessToken &&
      config.url !== API_PATH_REFRESH_TOKEN // We should not add the header when refreshing token
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config
  if (
    error.response.status === 401 &&
    error.response.data.message === 'Expired JWT Token' &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true
    await store.dispatch('user/refreshAccessToken')
    return axiosInstance(originalRequest)
  }
  return Promise.reject(error)
})

export default axiosInstance
