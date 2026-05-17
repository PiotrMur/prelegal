/**
 * Converts a subset of Markdown to HTML.
 *
 * Supported syntax:
 *  - **text** → <strong>text</strong>
 *  - *text*   → <em>text</em> (not inside **)
 *  - [text](url) → <a href="url" target="_blank" rel="noopener noreferrer">text</a>
 *  - # / ## / ### headings
 *  - Numbered lists (1. 2. ...) → <ol><li>...</li></ol>
 *  - Blank-line-separated blocks → <p> wrapped (unless already block-level HTML)
 *
 * Existing HTML tags (e.g. <span>, <mark>) are preserved as-is.
 */
export function markdownToHtml(markdown: string): string {
  // Split into paragraphs on blank lines
  const blocks = markdown.split(/\n\n+/)

  const processedBlocks: string[] = []
  let numberedListItems: string[] = []

  function flushNumberedList(): void {
    if (numberedListItems.length > 0) {
      processedBlocks.push(
        `<ol>\n${numberedListItems.map((item) => `<li>${item}</li>`).join('\n')}\n</ol>`
      )
      numberedListItems = []
    }
  }

  for (const block of blocks) {
    const trimmed = block.trim()
    if (!trimmed) continue

    // Check if it's a heading
    if (/^###\s/.test(trimmed)) {
      flushNumberedList()
      processedBlocks.push(`<h3>${applyInline(trimmed.replace(/^###\s+/, ''))}</h3>`)
      continue
    }

    if (/^##\s/.test(trimmed)) {
      flushNumberedList()
      processedBlocks.push(`<h2>${applyInline(trimmed.replace(/^##\s+/, ''))}</h2>`)
      continue
    }

    if (/^#\s/.test(trimmed)) {
      flushNumberedList()
      processedBlocks.push(`<h1>${applyInline(trimmed.replace(/^#\s+/, ''))}</h1>`)
      continue
    }

    // Check if it's a numbered list item (starts with digit followed by dot and space)
    const numberedMatch = trimmed.match(/^\d+\.\s+(.*)$/s)
    if (numberedMatch) {
      numberedListItems.push(applyInline(numberedMatch[1]))
      continue
    }

    // Not a numbered list item — flush any accumulated list items
    flushNumberedList()

    // If block already starts with a block-level HTML tag, keep as-is (apply inline still)
    if (/^<(h[1-6]|ol|ul|li|div|table|blockquote)/i.test(trimmed)) {
      processedBlocks.push(applyInline(trimmed))
      continue
    }

    // Otherwise wrap in <p>
    processedBlocks.push(`<p>${applyInline(trimmed)}</p>`)
  }

  flushNumberedList()

  return processedBlocks.join('\n')
}

/**
 * Apply inline markdown transformations to a string.
 * Preserves existing HTML tags.
 */
function applyInline(text: string): string {
  // Bold: **text** → <strong>text</strong>
  // Must be done before italic to avoid double-processing
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Italic: *text* → <em>text</em>
  // Only match single asterisks not adjacent to another asterisk
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')

  // Links: [text](url) → <a href="url" ...>text</a>
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  return text
}
