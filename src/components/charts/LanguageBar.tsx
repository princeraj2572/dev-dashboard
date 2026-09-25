interface Language {
  language: string
  percentage: number
}

interface LanguageBarProps {
  languages: Language[]
  limit?: number
}

/** One stacked bar plus a legend, in place of a pie chart with overlapping labels. */
export const LanguageBar = ({ languages, limit = 5 }: LanguageBarProps) => {
  const shown = languages.slice(0, limit)

  if (shown.length === 0) {
    return <p className="py-8 text-center text-sm text-subtle">No language data for your public repositories.</p>
  }

  return (
    <div>
      <div
        className="flex h-3 gap-0.5 overflow-hidden rounded-full"
        role="img"
        aria-label={`Languages: ${shown.map((l) => `${l.language} ${l.percentage.toFixed(0)}%`).join(', ')}`}
      >
        {shown.map((l, i) => (
          <div
            key={l.language}
            style={{ width: `${l.percentage}%`, background: `var(--data-${(i % 5) + 1})` }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>
      <ul className="mt-5 space-y-2.5">
        {shown.map((l, i) => (
          <li key={l.language} className="flex items-center gap-3 text-sm">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ background: `var(--data-${(i % 5) + 1})` }}
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 truncate font-medium">{l.language}</span>
            <span className="tabular-nums text-subtle">{l.percentage.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LanguageBar
