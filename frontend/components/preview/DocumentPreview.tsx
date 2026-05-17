'use client'

import { FormFields } from '@/domain/types'
import { buildCoverPage } from '@/domain/buildCoverPage'
import { buildStandardTerms } from '@/domain/buildStandardTerms'
import { useDocumentPrint } from '@/hooks/useDocumentPrint'
import { CoverPage } from '@/components/preview/CoverPage'
import { StandardTerms } from '@/components/preview/StandardTerms'
import { Button } from '@/components/ui/Button'

interface Props {
  fields: FormFields
  coverTemplate: string
  termsMarkdown: string
}

export function DocumentPreview({ fields, coverTemplate, termsMarkdown }: Props) {
  const { triggerPrint } = useDocumentPrint()
  const coverPageData = buildCoverPage(fields)
  const termsHtml = buildStandardTerms(fields, termsMarkdown)

  return (
    <div id="document-preview-container">
      {/* Toolbar - hidden on print */}
      <div className="flex items-center justify-between mb-4 no-print">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          Document Preview
        </h2>
        <Button variant="secondary" onClick={triggerPrint}>
          Download PDF
        </Button>
      </div>

      {/* Document - shown on print */}
      <div
        id="document-preview"
        className="bg-white border border-gray-200 shadow-sm p-8 min-h-[800px]"
      >
        <CoverPage data={coverPageData} />
        <hr className="border-gray-300 my-8 no-print" />
        <div className="print-page-break" />
        <h2 className="font-serif text-base font-bold mb-4 text-gray-900">Standard Terms</h2>
        <StandardTerms termsHtml={termsHtml} />
      </div>
    </div>
  )
}
