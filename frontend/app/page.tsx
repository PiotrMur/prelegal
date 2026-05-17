import { loadCoverPageTemplate, loadStandardTermsTemplate } from '@/lib/templateLoader'
import ClientShell from './ClientShell'

export default async function Home() {
  const [coverTemplate, termsMarkdown] = await Promise.all([
    loadCoverPageTemplate(),
    loadStandardTermsTemplate(),
  ])

  return <ClientShell coverTemplate={coverTemplate} termsMarkdown={termsMarkdown} />
}
