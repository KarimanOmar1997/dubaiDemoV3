import DOMPurify from 'dompurify'
import { marked } from 'marked'

export default function MarkdownMessage({ markdown }) {
  const safeInput = markdown.replace(/</g, '&lt;')
  const rawHtml = marked.parse(safeInput, { async: false })
  const sanitized = DOMPurify.sanitize(rawHtml, { KEEP_CONTENT: false })
  return (
    <span
      dangerouslySetInnerHTML={{ __html: sanitized }}
      style={{
        whiteSpace: 'normal'
      }}
    />
  )
}
