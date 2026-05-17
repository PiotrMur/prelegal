import { ReactNode } from 'react'
import { CoverPageData } from '@/domain/types'

interface Props {
  data: CoverPageData
}

function CoverSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">{title}</span>
        {description && (
          <span className="text-xs text-gray-400 italic">{description}</span>
        )}
      </div>
      <div className="text-sm text-gray-900 pl-0">{children}</div>
    </div>
  )
}

function CheckItem({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="mt-0.5 shrink-0">
        {checked ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="14" rx="2" fill="#111827"/>
            <path d="M3 7L5.5 9.5L11 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="13" height="13" rx="1.5" stroke="#9CA3AF"/>
          </svg>
        )}
      </span>
      <span className={checked ? 'text-gray-900' : 'text-gray-400'}>{label}</span>
    </div>
  )
}

export function CoverPage({ data }: Props) {
  return (
    <div className="font-serif text-sm text-gray-900 mb-8">
      <h1 className="text-xl font-bold text-center mb-1 tracking-wide">
        Mutual Non-Disclosure Agreement
      </h1>

      <p className="text-xs text-gray-600 mb-6 text-center">
        This Mutual Non-Disclosure Agreement (the &quot;MNDA&quot;) consists of: (1) this Cover Page and (2)
        the Common Paper Mutual NDA Standard Terms Version 1.0. Any modifications of the Standard
        Terms should be made on the Cover Page.
      </p>

      <CoverSection title="Purpose" description="How Confidential Information may be used">
        <p>{data.purpose}</p>
      </CoverSection>

      <CoverSection title="Effective Date">
        <p>{data.effectiveDate}</p>
      </CoverSection>

      <CoverSection title="MNDA Term" description="The length of this MNDA">
        <div className="space-y-1">
          <CheckItem
            checked={data.mndaTermExpires}
            label={`Expires ${data.mndaTermYears ?? 1} year(s) from Effective Date.`}
          />
          <CheckItem
            checked={!data.mndaTermExpires}
            label="Continues until terminated in accordance with the terms of the MNDA."
          />
        </div>
      </CoverSection>

      <CoverSection
        title="Term of Confidentiality"
        description="How long Confidential Information is protected"
      >
        <div className="space-y-1">
          <CheckItem
            checked={data.termOfConfYears}
            label={`${data.termOfConfYearsCount ?? 1} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`}
          />
          <CheckItem checked={!data.termOfConfYears} label="In perpetuity." />
        </div>
      </CoverSection>

      <CoverSection title="Governing Law & Jurisdiction">
        <p>
          <strong>Governing Law:</strong> {data.governingLaw || '—'}
        </p>
        <p>
          <strong>Jurisdiction:</strong> {data.jurisdiction || '—'}
        </p>
      </CoverSection>

      {data.modifications && (
        <CoverSection title="MNDA Modifications">
          <p>{data.modifications}</p>
        </CoverSection>
      )}

      <div className="mt-6 mb-4">
        <p className="text-xs mb-3">
          By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective
          Date.
        </p>
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="border border-gray-400 px-3 py-2 text-left w-1/4 bg-gray-50"></th>
              <th className="border border-gray-400 px-3 py-2 text-center bg-gray-50">
                PARTY 1
                <br />
                <span className="font-normal text-gray-600">
                  {data.party1.company || '(Company)'}
                </span>
              </th>
              <th className="border border-gray-400 px-3 py-2 text-center bg-gray-50">
                PARTY 2
                <br />
                <span className="font-normal text-gray-600">
                  {data.party2.company || '(Company)'}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ['Signature', '', ''],
                ['Print Name', data.party1.printName, data.party2.printName],
                ['Title', data.party1.title, data.party2.title],
                ['Company', data.party1.company, data.party2.company],
                ['Notice Address', data.party1.noticeAddress, data.party2.noticeAddress],
                ['Date', data.effectiveDate, data.effectiveDate],
              ] as [string, string, string][]
            ).map(([label, v1, v2]) => (
              <tr key={label}>
                <td className="border border-gray-400 px-3 py-2 font-semibold bg-gray-50">
                  {label}
                </td>
                <td className="border border-gray-400 px-3 py-3 text-center">{v1}</td>
                <td className="border border-gray-400 px-3 py-3 text-center">{v2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under CC BY 4.0.
      </p>
    </div>
  )
}
