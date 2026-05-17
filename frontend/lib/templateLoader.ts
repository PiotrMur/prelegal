import 'server-only'
import { promises as fs } from 'fs'
import path from 'path'

export async function loadCoverPageTemplate(): Promise<string> {
  const filePath = path.join(process.cwd(), '..', 'templates', 'Mutual-NDA-coverpage.md')
  return fs.readFile(filePath, 'utf8')
}

export async function loadStandardTermsTemplate(): Promise<string> {
  const filePath = path.join(process.cwd(), '..', 'templates', 'Mutual-NDA.md')
  return fs.readFile(filePath, 'utf8')
}
