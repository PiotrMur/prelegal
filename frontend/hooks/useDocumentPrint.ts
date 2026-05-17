'use client'

import { useCallback } from 'react'

export function useDocumentPrint(): { triggerPrint: () => void } {
  const triggerPrint = useCallback(() => {
    window.print()
  }, [])

  return { triggerPrint }
}
