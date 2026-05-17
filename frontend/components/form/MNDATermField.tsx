'use client'

import { MNDATerm } from '@/domain/types'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

interface Props {
  value: MNDATerm
  onChange: (v: MNDATerm) => void
}

export function MNDATermField({ value, onChange }: Props) {
  const isExpires = value.kind === 'expires'
  const years = value.kind === 'expires' ? value.years : 1

  const handleRadioChange = (kind: string) => {
    if (kind === 'expires') {
      onChange({ kind: 'expires', years: 1 })
    } else {
      onChange({ kind: 'until_terminated' })
    }
  }

  const handleYearsChange = (newYears: number) => {
    onChange({ kind: 'expires', years: newYears })
  }

  return (
    <div className="flex flex-col gap-3">
      <Label>MNDA Term</Label>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 cursor-pointer select-none group">
          <input
            type="radio"
            name="mndaTerm"
            value="expires"
            checked={isExpires}
            onChange={() => handleRadioChange('expires')}
            className="sr-only"
          />
          <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            isExpires ? 'border-gray-900' : 'border-gray-300 group-hover:border-gray-500'
          }`}>
            {isExpires && <span className="w-2 h-2 rounded-full bg-gray-900" />}
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-800">
            Expires after
            <Input
              type="number"
              min="1"
              value={years}
              onChange={(e) => handleYearsChange(Number(e.target.value))}
              className="w-20 inline-block"
              disabled={!isExpires}
            />
            year(s) from Effective Date
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer select-none group">
          <input
            type="radio"
            name="mndaTerm"
            value="until_terminated"
            checked={!isExpires}
            onChange={() => handleRadioChange('until_terminated')}
            className="sr-only"
          />
          <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            !isExpires ? 'border-gray-900' : 'border-gray-300 group-hover:border-gray-500'
          }`}>
            {!isExpires && <span className="w-2 h-2 rounded-full bg-gray-900" />}
          </span>
          <span className="text-sm text-gray-800">Continues until terminated</span>
        </label>
      </div>
    </div>
  )
}
