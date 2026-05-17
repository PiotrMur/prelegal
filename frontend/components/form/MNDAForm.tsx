'use client'

import { Dispatch } from 'react'
import { FormFields, Party } from '@/domain/types'
import { Action } from '@/hooks/useMNDAForm'
import { FormSection } from '@/components/form/FormSection'
import { PartyFields } from '@/components/form/PartyFields'
import { MNDATermField } from '@/components/form/MNDATermField'
import { TermOfConfField } from '@/components/form/TermOfConfField'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'

interface Props {
  fields: FormFields
  dispatch: Dispatch<Action>
}

export function MNDAForm({ fields, dispatch }: Props) {
  const handlePartyChange = (party: 'party1' | 'party2', updated: Party) => {
    ;(Object.keys(updated) as Array<keyof Party>).forEach((field) => {
      dispatch({ type: 'UPDATE_PARTY', party, field, value: updated[field] })
    })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
      <FormSection title="Basic Information">
        <div className="space-y-4">
          <div>
            <Label htmlFor="purpose" required>
              Purpose
            </Label>
            <Textarea
              id="purpose"
              rows={3}
              value={fields.purpose}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_FIELD', field: 'purpose', value: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="effectiveDate">Effective Date</Label>
            <Input
              id="effectiveDate"
              type="date"
              value={fields.effectiveDate}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_FIELD', field: 'effectiveDate', value: e.target.value })
              }
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="MNDA Term">
        <MNDATermField
          value={fields.mndaTerm}
          onChange={(term) => dispatch({ type: 'SET_MNDA_TERM', term })}
        />
      </FormSection>

      <FormSection title="Term of Confidentiality">
        <TermOfConfField
          value={fields.termOfConf}
          onChange={(termOfConf) => dispatch({ type: 'SET_TERM_OF_CONF', termOfConf })}
        />
      </FormSection>

      <FormSection title="Governing Law & Jurisdiction">
        <div className="space-y-4">
          <div>
            <Label htmlFor="governingLaw" required>
              Governing Law (state name)
            </Label>
            <Input
              id="governingLaw"
              value={fields.governingLaw}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_FIELD', field: 'governingLaw', value: e.target.value })
              }
              placeholder="e.g. Delaware"
              required
            />
          </div>

          <div>
            <Label htmlFor="jurisdictionCity" required>
              Jurisdiction City
            </Label>
            <Input
              id="jurisdictionCity"
              value={fields.jurisdictionCity}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_FIELD',
                  field: 'jurisdictionCity',
                  value: e.target.value,
                })
              }
              placeholder="e.g. Wilmington"
              required
            />
          </div>

          <div>
            <Label htmlFor="jurisdictionState" required>
              Jurisdiction State
            </Label>
            <Input
              id="jurisdictionState"
              value={fields.jurisdictionState}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_FIELD',
                  field: 'jurisdictionState',
                  value: e.target.value,
                })
              }
              placeholder="e.g. Delaware"
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="MNDA Modifications">
        <div>
          <Label htmlFor="modifications">
            Any modifications to standard terms (optional)
          </Label>
          <Textarea
            id="modifications"
            rows={3}
            value={fields.modifications}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_FIELD', field: 'modifications', value: e.target.value })
            }
            placeholder="Describe any deviations from the standard terms..."
          />
        </div>
      </FormSection>

      <FormSection title="Party 1">
        <PartyFields
          label="Party 1"
          party={fields.party1}
          onChange={(updated) => handlePartyChange('party1', updated)}
        />
      </FormSection>

      <FormSection title="Party 2">
        <PartyFields
          label="Party 2"
          party={fields.party2}
          onChange={(updated) => handlePartyChange('party2', updated)}
        />
      </FormSection>
    </form>
  )
}
