import { validateFormFields } from '@/domain/validation'
import type { FormFields } from '@/domain/types'

function makeValidFields(overrides?: Partial<FormFields>): FormFields {
  return {
    purpose: 'Evaluating a potential business relationship',
    effectiveDate: '2024-06-01',
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

describe('validateFormFields', () => {
  it('validates a complete valid FormFields object', () => {
    const result = validateFormFields(makeValidFields())
    expect(result.success).toBe(true)
  })

  it('fails when purpose is empty', () => {
    const result = validateFormFields(makeValidFields({ purpose: '' }))
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors['purpose']).toBeDefined()
    }
  })

  it("fails when party1.printName is empty", () => {
    const result = validateFormFields(
      makeValidFields({
        party1: {
          printName: '',
          company: 'Acme Corp',
          title: 'CEO',
          noticeAddress: '123 Main St',
        },
      })
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors['party1.printName']).toBeDefined()
    }
  })

  it("fails when party1.company is empty", () => {
    const result = validateFormFields(
      makeValidFields({
        party1: {
          printName: 'Alice Smith',
          company: '',
          title: 'CEO',
          noticeAddress: '123 Main St',
        },
      })
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors['party1.company']).toBeDefined()
    }
  })

  it("fails when party2.printName is empty", () => {
    const result = validateFormFields(
      makeValidFields({
        party2: {
          printName: '',
          company: 'Beta LLC',
          title: 'CTO',
          noticeAddress: '456 Market St',
        },
      })
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors['party2.printName']).toBeDefined()
    }
  })

  it('fails when governingLaw is missing', () => {
    const result = validateFormFields(makeValidFields({ governingLaw: '' }))
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors['governingLaw']).toBeDefined()
    }
  })

  it('fails when mndaTerm expires years is 0', () => {
    const result = validateFormFields(
      makeValidFields({ mndaTerm: { kind: 'expires', years: 0 } })
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors['mndaTerm.years']).toBeDefined()
    }
  })

  it('fails when termOfConf years is 0', () => {
    const result = validateFormFields(
      makeValidFields({ termOfConf: { kind: 'years', years: 0 } })
    )
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors['termOfConf.years']).toBeDefined()
    }
  })

  it('succeeds with until_terminated MNDATerm (no years needed)', () => {
    const result = validateFormFields(
      makeValidFields({ mndaTerm: { kind: 'until_terminated' } })
    )
    expect(result.success).toBe(true)
  })

  it('succeeds with perpetuity TermOfConf', () => {
    const result = validateFormFields(
      makeValidFields({ termOfConf: { kind: 'perpetuity' } })
    )
    expect(result.success).toBe(true)
  })
})
