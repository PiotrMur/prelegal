'use client'

import { Dispatch, useReducer } from 'react'
import { FormFields, MNDATerm, TermOfConf, Party } from '@/domain/types'

export type Action =
  | { type: 'UPDATE_FIELD'; field: keyof Omit<FormFields, 'party1' | 'party2' | 'mndaTerm' | 'termOfConf'>; value: string }
  | { type: 'UPDATE_PARTY'; party: 'party1' | 'party2'; field: keyof Party; value: string }
  | { type: 'SET_MNDA_TERM'; term: MNDATerm }
  | { type: 'SET_TERM_OF_CONF'; termOfConf: TermOfConf }
  | { type: 'RESET' }

function getInitialState(): FormFields {
  return {
    purpose: 'Evaluating whether to enter into a business relationship with the other party.',
    effectiveDate: new Date().toISOString().split('T')[0],
    mndaTerm: { kind: 'expires', years: 1 },
    termOfConf: { kind: 'years', years: 1 },
    governingLaw: '',
    jurisdictionCity: '',
    jurisdictionState: '',
    modifications: '',
    party1: { printName: '', company: '', title: '', noticeAddress: '' },
    party2: { printName: '', company: '', title: '', noticeAddress: '' },
  }
}

function reducer(state: FormFields, action: Action): FormFields {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }

    case 'UPDATE_PARTY':
      return {
        ...state,
        [action.party]: {
          ...state[action.party],
          [action.field]: action.value,
        },
      }

    case 'SET_MNDA_TERM':
      return { ...state, mndaTerm: action.term }

    case 'SET_TERM_OF_CONF':
      return { ...state, termOfConf: action.termOfConf }

    case 'RESET':
      return getInitialState()

    default:
      return state
  }
}

export function useMNDAForm(): { fields: FormFields; dispatch: Dispatch<Action> } {
  const [fields, dispatch] = useReducer(reducer, undefined, getInitialState)
  return { fields, dispatch }
}
