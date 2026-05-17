import { z } from 'zod'
import type { FormFields } from './types'

export const partySchema = z.object({
  printName: z.string().min(1, 'Print name is required'),
  company: z.string().min(1, 'Company is required'),
  title: z.string().optional().default(''),
  noticeAddress: z.string().optional().default(''),
})

export const formFieldsSchema = z.object({
  purpose: z.string().min(1, 'Purpose is required'),
  effectiveDate: z.string().min(1, 'Effective date is required'),
  mndaTerm: z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('expires'),
      years: z.number().min(1, 'MNDA term years must be at least 1'),
    }),
    z.object({
      kind: z.literal('until_terminated'),
    }),
  ]),
  termOfConf: z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('years'),
      years: z.number().min(1, 'Term of confidentiality years must be at least 1'),
    }),
    z.object({
      kind: z.literal('perpetuity'),
    }),
  ]),
  governingLaw: z.string().min(1, 'Governing law is required'),
  jurisdictionCity: z.string().min(1, 'Jurisdiction city is required'),
  jurisdictionState: z.string().min(1, 'Jurisdiction state is required'),
  modifications: z.string().optional().default(''),
  party1: partySchema,
  party2: partySchema,
})

export function validateFormFields(
  data: unknown
): { success: true; data: FormFields } | { success: false; errors: Record<string, string> } {
  const result = formFieldsSchema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data as FormFields }
  }

  const errors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const path = issue.path.join('.')
    if (!errors[path]) {
      errors[path] = issue.message
    }
  }

  return { success: false, errors }
}
