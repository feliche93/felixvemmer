import { unstable_cache } from 'next/cache'
import { z } from 'zod'
import { client } from './papierkram-typescript-sdk'

const SBilling = z.object({
  company: z.string(),
  email: z.string().nullable(),
  ust_idnr: z.string(),
  street: z.string(),
  zip: z.string(),
  city: z.string(),
  country: z.string(),
  contact_person: z.string(),
  department: z.string().nullable(),
})

const SEntry = z.object({
  type: z.string(),
  id: z.number(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  type_of: z.string(),
  document_date: z.string(),
  due_date: z.string(),
  supply_date: z.string(),
  customer_no: z.string().nullable(),
  invoice_no: z.string().nullable(),
  sent_on: z.string().nullable(),
  sent_via: z.string().nullable(),
  sent_to: z.string().nullable(),
  paid_at_date: z.string().nullable(),
  state: z.string(),
  record_state: z.string(),
  custom_template: z.unknown().nullable(),
  total_net: z.number(),
  total_vat: z.number(),
  total_gross: z.number(),
  down_payment_total_gross: z.number(),
  outstanding_amount: z.string(),
  billing: SBilling,
})

export type TEntry = z.infer<typeof SEntry>

const SResult = z.object({
  type: z.string(),
  page: z.number(),
  page_size: z.number(),
  total_pages: z.number(),
  total_entries: z.number(),
  has_more: z.boolean(),
  entries: z.array(SEntry),
})

const token = process.env.PAPIERKRAM_TOKEN

if (!token) {
  throw new Error('PAPIERKRAM_TOKEN is not set')
}

const papierkramApi = new client({
  TOKEN: token,
})

const getPapierkramInvoices = async ({ page: { page: number } }: { page: { page: number } }) => {
  const result = await papierkramApi.incomeInvoiceRechnung.getIncomeInvoices({
    page: number,
    pageSize: 100,
  })

  const parsed = SResult.parse(result)

  return parsed
}

export const getFreelancingRevenue = unstable_cache(
  async () => {
    let page = 1
    let allInvoices = [] as TEntry[]

    while (true) {
      const invoices = await getPapierkramInvoices({ page: { page } })
      allInvoices = [...allInvoices, ...invoices.entries]

      if (page >= invoices.total_pages) {
        break
      }

      page++
    }

    // console log all unique states
    // console.log([...new Set(allInvoices.map((invoice) => invoice.state))])

    // return allInvoices.map((invoice) => {
    //   return {
    //     state: invoice.state,
    //     total_gross: invoice.total_gross,
    //     outstanding_amount: invoice.outstanding_amount,
    //     document_date: invoice.document_date,
    //     payment_date: invoice.paid_at_date,
    //   }
    // })

    const currentYear = new Date().getFullYear()
    allInvoices = allInvoices.filter((invoice) => {
      const invoiceYear = new Date(invoice.document_date).getFullYear()
      return (
        invoice.state === 'paid' && invoice.paid_at_date // &&
        // invoice.document_date &&
        // invoiceYear === currentYear
      )
    })
    const totalGross = allInvoices.reduce((sum, invoice) => sum + invoice.total_gross, 0)
    return totalGross
  },
  ['papierkram'],
  {
    revalidate: 3600,
  },
)
