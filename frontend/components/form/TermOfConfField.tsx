'use client'

import { TermOfConf } from '@/domain/types'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

interface Props {
  value: TermOfConf
  onChange: (v: TermOfConf) => void
}

export function TermOfConfField({ value, onChange }: Props) {
  const isYears = value.kind === 'years'
  const years = value.kind === 'years' ? value.years : 1

  const handleRadioChange = (kind: string) => {
    if (kind === 'years') {
      onChange({ kind: 'years', years: 1 })
    } else {
      onChange({ kind: 'perpetuity' })
    }
  }

  const handleYearsChange = (newYears: number) => {
    onChange({ kind: 'years', years: newYears })
  }

  return (
    <div className="flex flex-col gap-3">
      <Label>Term of Confidentiality</Label>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 cursor-pointer select-none group">
          <input
            type="radio"
            name="termOfConf"
            value="years"
            checked={isYears}
            onChange={() => handleRadioChange('years')}
            className="sr-only"
          />
          <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            isYears ? 'border-gray-900' : 'border-gray-300 group-hover:border-gray-500'
          }`}>
            {isYears && <span className="w-2 h-2 rounded-full bg-gray-900" />}
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-800">
            <Input
              type="number"
              min="1"
              value={years}
              onChange={(e) => handleYearsChange(Number(e.target.value))}
              className="w-20 inline-block"
              disabled={!isYears}
            />
            year(s) from Effective Date
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer select-none group">
          <input
            type="radio"
            name="termOfConf"
            value="perpetuity"
            checked={!isYears}
            onChange={() => handleRadioChange('perpetuity')}
            className="sr-only"
          />
          <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            !isYears ? 'border-gray-900' : 'border-gray-300 group-hover:border-gray-500'
          }`}>
            {!isYears && <span className="w-2 h-2 rounded-full bg-gray-900" />}
          </span>
          <span className="text-sm text-gray-800">In perpetuity</span>
        </label>
      </div>
    </div>
  )
}
