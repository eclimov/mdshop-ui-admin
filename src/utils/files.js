import { generateInvoiceDocument, getInvoiceDownloadLink } from '@/api/invoices'
import { apiUrl } from '../api/API'

export const downloadInvoiceDocument = async (invoiceId) => {
  await generateInvoiceDocument(invoiceId)
  window.location = getInvoiceDownloadLink(invoiceId)
}

export const getCompanyLogoUrl = (fileName) => {
  return `${apiUrl}/media/company/logos/${fileName}?rnd=${Date.now()}`
}
