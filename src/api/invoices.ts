import API, { apiUrl } from '@/api/API'
import type { InvoiceTypeCreate, InvoiceTypeView } from '@/types/invoice'

export const getInvoiceDownloadLink = (id: number) => `${apiUrl}/media/invoice/${id}.xlsx`

export const getInvoices = () => API.get('/invoices')
export const findInvoice = (id: string) => API.get(`/invoices/${id}`)
export const createInvoice = (data: InvoiceTypeCreate) => API.post('/invoices', data)
export const updateInvoice = (id: number, data: InvoiceTypeView) => API.put(`/invoices/${id}`, data)
export const deleteInvoice = (id: number) => API.delete(`/invoices/${id}`)
export const generateInvoiceDocument = (id: number) => API.post(`/invoices/${id}/generate`)
