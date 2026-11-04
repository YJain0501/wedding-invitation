interface OrnamentalDividerProps {
  className?: string
}

export function OrnamentalDivider({ className }: OrnamentalDividerProps) {
  return <div className={`ornamental-separator ${className ?? ''}`.trim()} />
}
