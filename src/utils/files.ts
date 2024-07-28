import { generateInvoiceDocument, getInvoiceDownloadLink } from '@/api/invoices'
import { apiUrl } from '@/api/API'

export const downloadInvoiceDocument = async (invoiceId: number) => {
  await generateInvoiceDocument(invoiceId)
  window.location.href = getInvoiceDownloadLink(invoiceId)
}

export const getCompanyLogoUrl = (fileName: string) => {
  return `${apiUrl}/media/company/logos/${fileName}?rnd=${Date.now()}`
}
