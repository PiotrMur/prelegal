import type { FormFields, CoverPageData } from './types'

export function buildCoverPage(fields: FormFields): CoverPageData {
  const { mndaTerm, termOfConf } = fields

  const mndaTermExpires = mndaTerm.kind === 'expires'
  const mndaTermYears = mndaTerm.kind === 'expires' ? mndaTerm.years : null
  const mndaTermText =
    mndaTerm.kind === 'expires'
      ? `Expires ${mndaTerm.years} year(s) from Effective Date.`
      : 'Continues until terminated in accordance with the terms of the MNDA.'

  const termOfConfYears = termOfConf.kind === 'years'
  const termOfConfYearsCount = termOfConf.kind === 'years' ? termOfConf.years : null
  const termOfConfText =
    termOfConf.kind === 'years'
      ? `${termOfConf.years} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`
      : 'In perpetuity.'

  const jurisdiction = `${fields.jurisdictionCity}, ${fields.jurisdictionState}`

  return {
    purpose: fields.purpose,
    effectiveDate: fields.effectiveDate,
    mndaTermText,
    mndaTermExpires,
    mndaTermYears,
    termOfConfText,
    termOfConfYears,
    termOfConfYearsCount,
    governingLaw: fields.governingLaw,
    jurisdiction,
    modifications: fields.modifications,
    party1: fields.party1,
    party2: fields.party2,
  }
}
