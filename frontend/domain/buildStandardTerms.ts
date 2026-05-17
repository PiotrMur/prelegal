import type { FormFields } from './types'
import { buildCoverPage } from './buildCoverPage'
import { markdownToHtml } from '../lib/markdownToHtml'

const COVERPAGE_LINK_REGEX = /<span class="coverpage_link">(.*?)<\/span>/g

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildStandardTerms(fields: FormFields, termsMarkdown: string): string {
  const coverPageData = buildCoverPage(fields)

  const valueMap: Record<string, string> = {
    'Purpose': fields.purpose,
    'Effective Date': fields.effectiveDate,
    'MNDA Term': coverPageData.mndaTermText,
    'Term of Confidentiality': coverPageData.termOfConfText,
    'Governing Law': fields.governingLaw,
    'Jurisdiction': coverPageData.jurisdiction,
  }

  const withResolvedValues = termsMarkdown.replace(
    COVERPAGE_LINK_REGEX,
    (_match, fieldName: string) => {
      const value = valueMap[fieldName]
      if (value !== undefined) {
        return `<mark class="resolved-value">${escapeHtml(value)}</mark>`
      }
      return _match
    }
  )

  return markdownToHtml(withResolvedValues)
}
