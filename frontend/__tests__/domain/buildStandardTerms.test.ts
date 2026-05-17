import { buildStandardTerms } from '@/domain/buildStandardTerms'
import type { FormFields } from '@/domain/types'

function makeFields(overrides?: Partial<FormFields>): FormFields {
  return {
    purpose: 'Exploring a partnership',
    effectiveDate: '2024-03-01',
    mndaTerm: { kind: 'expires', years: 1 },
    termOfConf: { kind: 'years', years: 3 },
    governingLaw: 'Delaware',
    jurisdictionCity: 'Wilmington',
    jurisdictionState: 'DE',
    modifications: '',
    party1: {
      printName: 'Alice Smith',
      company: 'Acme Corp',
      title: 'CEO',
      noticeAddress: '123 Main St',
    },
    party2: {
      printName: 'Bob Jones',
      company: 'Beta LLC',
      title: 'CTO',
      noticeAddress: '456 Market St',
    },
    ...overrides,
  }
}

describe('buildStandardTerms', () => {
  it('replaces Purpose coverpage_link with field value', () => {
    const fields = makeFields({ purpose: 'Evaluating a joint venture' })
    const template = 'The purpose is <span class="coverpage_link">Purpose</span>.'
    const result = buildStandardTerms(fields, template)
    expect(result).toContain('Evaluating a joint venture')
  })

  it('wraps resolved value in mark.resolved-value tag', () => {
    const fields = makeFields({ purpose: 'My Purpose' })
    const template = '<span class="coverpage_link">Purpose</span>'
    const result = buildStandardTerms(fields, template)
    expect(result).toContain('<mark class="resolved-value">My Purpose</mark>')
  })

  it('replaces Governing Law with governingLaw field', () => {
    const fields = makeFields({ governingLaw: 'New York' })
    const template = 'Governed by <span class="coverpage_link">Governing Law</span>.'
    const result = buildStandardTerms(fields, template)
    expect(result).toContain('New York')
  })

  it('replaces Jurisdiction with jurisdictionCity, jurisdictionState', () => {
    const fields = makeFields({ jurisdictionCity: 'Dallas', jurisdictionState: 'TX' })
    const template = 'Courts in <span class="coverpage_link">Jurisdiction</span>.'
    const result = buildStandardTerms(fields, template)
    expect(result).toContain('Dallas, TX')
  })

  it('replaces MNDA Term with computed mndaTermText', () => {
    const fields = makeFields({ mndaTerm: { kind: 'expires', years: 2 } })
    const template = 'Term: <span class="coverpage_link">MNDA Term</span>.'
    const result = buildStandardTerms(fields, template)
    expect(result).toContain('Expires 2 year(s) from Effective Date.')
  })

  it('replaces all 6 coverpage_link types correctly', () => {
    const fields = makeFields({
      purpose: 'Test Purpose',
      effectiveDate: '2024-01-01',
      mndaTerm: { kind: 'until_terminated' },
      termOfConf: { kind: 'perpetuity' },
      governingLaw: 'Florida',
      jurisdictionCity: 'Miami',
      jurisdictionState: 'FL',
    })

    const template = [
      '<span class="coverpage_link">Purpose</span>',
      '<span class="coverpage_link">Effective Date</span>',
      '<span class="coverpage_link">MNDA Term</span>',
      '<span class="coverpage_link">Term of Confidentiality</span>',
      '<span class="coverpage_link">Governing Law</span>',
      '<span class="coverpage_link">Jurisdiction</span>',
    ].join('\n\n')

    const result = buildStandardTerms(fields, template)

    expect(result).toContain('Test Purpose')
    expect(result).toContain('2024-01-01')
    expect(result).toContain('Continues until terminated')
    expect(result).toContain('In perpetuity.')
    expect(result).toContain('Florida')
    expect(result).toContain('Miami, FL')
  })

  it('converts markdown bold to strong tags', () => {
    const fields = makeFields()
    const template = '**Introduction**. This is an introduction.'
    const result = buildStandardTerms(fields, template)
    expect(result).toContain('<strong>Introduction</strong>')
  })
})
