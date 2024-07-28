import axios from 'axios'
import { API_PATH_REFRESH_TOKEN } from '@/api/auth'
import { useUser } from '@/stores/user'
import { useRouter } from 'vue-router'

export const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api`

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: 'application/json'
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUser()

    if (userStore.accessToken &&
      config.url !== API_PATH_REFRESH_TOKEN // We should not add the header when refreshing token
    ) {
      config.headers.Authorization = `Bearer ${userStore.accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    const userStore = useUser()
    const router = useRouter()

    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Expired JWT Token' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        await userStore.refreshAccessToken()  // TODO: test this
        return axiosInstance(originalRequest)
      } catch (refreshTokenError) { // In case of invalid refresh token, logout and redirect to home
        userStore.reset()
        await router.push({ name: 'home' })
      }
    }

    // TODO: implement toast message: https://github.com/wobsoriano/vuetify-sonner
    return Promise.reject(error)
  }
)

export default axiosInstance
