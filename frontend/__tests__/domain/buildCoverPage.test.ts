import { buildCoverPage } from '@/domain/buildCoverPage'
import type { FormFields } from '@/domain/types'

function makeFields(overrides?: Partial<FormFields>): FormFields {
  return {
    purpose: 'Evaluating a potential business partnership',
    effectiveDate: '2024-01-15',
    mndaTerm: { kind: 'expires', years: 1 },
    termOfConf: { kind: 'years', years: 2 },
    governingLaw: 'California',
    jurisdictionCity: 'San Francisco',
    jurisdictionState: 'CA',
    modifications: '',
    party1: {
      printName: 'Alice Smith',
      company: 'Acme Corp',
      title: 'CEO',
      noticeAddress: '123 Main St, San Francisco, CA 94105',
    },
    party2: {
      printName: 'Bob Jones',
      company: 'Beta LLC',
      title: 'CTO',
      noticeAddress: '456 Market St, San Francisco, CA 94102',
    },
    ...overrides,
  }
}

describe('buildCoverPage', () => {
  it("maps 'expires' MNDATerm to correct text", () => {
    const fields = makeFields({ mndaTerm: { kind: 'expires', years: 2 } })
    const result = buildCoverPage(fields)
    expect(result.mndaTermText).toContain('Expires 2 year(s)')
  })

  it('sets mndaTermExpires true for expires kind', () => {
    const fields = makeFields({ mndaTerm: { kind: 'expires', years: 3 } })
    const result = buildCoverPage(fields)
    expect(result.mndaTermExpires).toBe(true)
  })

  it('sets mndaTermYears to null for until_terminated', () => {
    const fields = makeFields({ mndaTerm: { kind: 'until_terminated' } })
    const result = buildCoverPage(fields)
    expect(result.mndaTermYears).toBeNull()
  })

  it('maps until_terminated to correct text', () => {
    const fields = makeFields({ mndaTerm: { kind: 'until_terminated' } })
    const result = buildCoverPage(fields)
    expect(result.mndaTermText).toBe(
      'Continues until terminated in accordance with the terms of the MNDA.'
    )
  })

  it("maps 'years' TermOfConf to correct text with year count", () => {
    const fields = makeFields({ termOfConf: { kind: 'years', years: 5 } })
    const result = buildCoverPage(fields)
    expect(result.termOfConfText).toContain('5 year(s)')
    expect(result.termOfConfText).toContain('trade secrets')
  })

  it("maps 'perpetuity' to 'In perpetuity.'", () => {
    const fields = makeFields({ termOfConf: { kind: 'perpetuity' } })
    const result = buildCoverPage(fields)
    expect(result.termOfConfText).toBe('In perpetuity.')
  })

  it('concatenates jurisdiction from city and state', () => {
    const fields = makeFields({ jurisdictionCity: 'Austin', jurisdictionState: 'TX' })
    const result = buildCoverPage(fields)
    expect(result.jurisdiction).toBe('Austin, TX')
  })

  it('copies purpose directly from fields', () => {
    const purpose = 'Exploring a joint venture opportunity'
    const fields = makeFields({ purpose })
    const result = buildCoverPage(fields)
    expect(result.purpose).toBe(purpose)
  })

  it('copies party1 and party2 directly from fields', () => {
    const fields = makeFields()
    const result = buildCoverPage(fields)
    expect(result.party1).toEqual(fields.party1)
    expect(result.party2).toEqual(fields.party2)
  })
})
