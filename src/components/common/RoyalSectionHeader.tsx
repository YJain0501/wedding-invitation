import { OrnamentalDivider } from '@/components/common/OrnamentalDivider'

interface RoyalSectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  centered?: boolean
}

export function RoyalSectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
}: RoyalSectionHeaderProps) {
  return (
    <header className={centered ? 'text-center' : 'text-left'}>
      <p className="font-serif text-xs uppercase tracking-invitation text-royal-goldLight/90">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-4xl leading-tight text-royal-ivory sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-royal-cream/90 sm:text-base">
          {description}
        </p>
      ) : null}
      <OrnamentalDivider className="mt-4" />
    </header>
  )
}
