import API from '@/api/API'

export const login = (data) => API.post('/authentication_token', data)

export const API_PATH_REFRESH_TOKEN = '/token/refresh'
export const refreshAccessToken = (data) => API.post(API_PATH_REFRESH_TOKEN, data)
