import { generateInvoiceDocument, getInvoiceDownloadLink } from '@/api/invoices'

export const downloadInvoiceDocument = async (invoiceId) => {
  await generateInvoiceDocument(invoiceId)
  window.location = getInvoiceDownloadLink(invoiceId)
}
