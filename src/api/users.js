import API from '@/api/API'

export const API_PATH_USERS = '/users'
export const getUsers = () => API.get(API_PATH_USERS)
export const findUser = (id) => API.get(`${API_PATH_USERS}/${id}`)
export const createUser = (data) => API.post(API_PATH_USERS, data)
export const updateUser = (id, data) => API.put(`${API_PATH_USERS}/${id}`, data)
export const deleteUser = (id) => API.delete(`${API_PATH_USERS}/${id}`)
