const NAV_ITEMS = [
  { href: '#hero', label: 'Home' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
]

export function MobileQuickNav() {
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-40 w-[calc(100%-1rem)] max-w-[30rem] -translate-x-1/2 rounded-full border border-royal-gold/30 bg-royal-burgundyDark/85 px-2.5 py-1.5 shadow-royal backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-3 gap-1 text-center">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="block rounded-full px-2 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.08em] text-royal-goldLight transition hover:bg-royal-wine/70 hover:text-amber-100"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
