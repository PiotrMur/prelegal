'use client'

import { useMNDAForm } from '@/hooks/useMNDAForm'
import { MNDAForm } from '@/components/form/MNDAForm'
import { DocumentPreview } from '@/components/preview/DocumentPreview'

interface Props {
  coverTemplate: string
  termsMarkdown: string
}

export default function ClientShell({ coverTemplate, termsMarkdown }: Props) {
  const { fields, dispatch } = useMNDAForm()

  return (
    <div>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 no-print">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
            Mutual NDA Creator
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Fill in the details to generate your Mutual Non-Disclosure Agreement
          </p>
        </div>
      </header>

      {/* Main content: two columns */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form column */}
          <div className="no-print">
            <div className="bg-white border border-gray-200 p-6">
              <MNDAForm fields={fields} dispatch={dispatch} />
            </div>
          </div>

          {/* Preview column - sticky */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <DocumentPreview
              fields={fields}
              coverTemplate={coverTemplate}
              termsMarkdown={termsMarkdown}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
