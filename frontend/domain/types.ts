export type MNDATerm =
  | { kind: 'expires'; years: number }
  | { kind: 'until_terminated' }

export type TermOfConf =
  | { kind: 'years'; years: number }
  | { kind: 'perpetuity' }

export interface Party {
  printName: string
  company: string
  title: string
  noticeAddress: string
}

export interface FormFields {
  purpose: string
  effectiveDate: string
  mndaTerm: MNDATerm
  termOfConf: TermOfConf
  governingLaw: string
  jurisdictionCity: string
  jurisdictionState: string
  modifications: string
  party1: Party
  party2: Party
}

export interface CoverPageData {
  purpose: string
  effectiveDate: string
  mndaTermText: string
  mndaTermExpires: boolean
  mndaTermYears: number | null
  termOfConfText: string
  termOfConfYears: boolean
  termOfConfYearsCount: number | null
  governingLaw: string
  jurisdiction: string
  modifications: string
  party1: Party
  party2: Party
}
