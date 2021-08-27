import API from "@/api/API";

export const getBanks = () => API.get('/banks')
export const findBank = (id) => API.get(`/banks/${id}`)
