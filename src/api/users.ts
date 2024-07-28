import API from '@/api/API'
import type { UserTypeCreate } from '@/types/user'

export const API_PATH_USERS = '/users'
export const getUsers = () => API.get(API_PATH_USERS)
export const findUser = (id: string) => API.get(`${API_PATH_USERS}/${id}`)
export const createUser = (data: UserTypeCreate) => API.post(API_PATH_USERS, data)
export const updateUser = (id: number, data: UserTypeCreate) => API.put(`${API_PATH_USERS}/${id}`, data)
export const deleteUser = (id: number) => API.delete(`${API_PATH_USERS}/${id}`)
