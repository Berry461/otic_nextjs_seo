import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window!== 'undefined') {
      const token = localStorage.getItem('access')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (typeof window === 'undefined') return Promise.reject(error)

    if (error.response?.status === 401 &&!originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh')
        if (!refreshToken) throw new Error('No refresh token')

        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        })

        const newAccessToken = response.data.access
        localStorage.setItem('access', newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        window.location.href = '/admin/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
