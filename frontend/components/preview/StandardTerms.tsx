interface Props {
  termsHtml: string
}

export function StandardTerms({ termsHtml }: Props) {
  return (
    <div
      className="font-serif text-sm leading-relaxed text-gray-900 space-y-4"
      dangerouslySetInnerHTML={{ __html: termsHtml }}
    />
  )
}
