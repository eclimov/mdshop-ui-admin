import API from '@/api/API'
import type { AuthTypeCreate, AuthTypeRefreshTokenCreate } from '@/types/auth'

export const login = (data: AuthTypeCreate) => API.post('/authentication_token', data)

export const API_PATH_REFRESH_TOKEN = '/token/refresh'
export const refreshAccessToken = (data: AuthTypeRefreshTokenCreate) => API.post(API_PATH_REFRESH_TOKEN, data)
