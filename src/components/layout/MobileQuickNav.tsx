const NAV_ITEMS = [
  { href: '#hero', label: 'Home' },
  { href: '#events', label: 'Events' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'RSVP' },
]

export function MobileQuickNav() {
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed bottom-5 left-1/2 z-40 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-full border border-royal-gold/30 bg-royal-burgundyDark/85 px-2 py-1.5 shadow-royal backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-4 gap-1 text-center">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="block rounded-full px-2 py-1.5 text-[0.66rem] font-medium uppercase tracking-wide text-royal-goldLight transition hover:bg-royal-wine/70 hover:text-amber-100"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
