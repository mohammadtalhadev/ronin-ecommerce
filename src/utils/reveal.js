// Centralized scroll-reveal system.
//
// Uses a single IntersectionObserver to add the `is-revealed` class to any
// element carrying a `data-reveal` attribute the moment it scrolls into view.
// A lightweight mutation hook re-scans for elements added by client-side
// routing, so every page/section is picked up without adding per-section JS.
//
// Elements are revealed once (the observer stops watching after firing), so
// animations never re-trigger on every scroll. The system is defensive: the
// plain `[data-reveal]` set is never hidden unless the parent also has the
// `.js` class, keeping content visible if JavaScript is unavailable.

const STAGGER_STEP = 50
const STAGGER_MAX = 6

export function initReveal() {
  let io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )

  const scan = () => {
    // Observe every reveal target (sections and group containers).
    const nodes = document.querySelectorAll('[data-reveal], [data-reveal-group]')
    for (const node of nodes) {
      if (!node.classList.contains('is-revealed')) {
        io.observe(node)
      }
    }

    // Apply a small stagger to product-card children of a group so the
    // entrance reads as a subtle cascade rather than a single block.
    const groups = document.querySelectorAll('[data-reveal-group]')
    for (const group of groups) {
      Array.from(group.children)
        .filter((el) => el.classList && el.classList.contains('product-card'))
        .forEach((card, idx) => {
          const delay = Math.min(idx, STAGGER_MAX - 1) * STAGGER_STEP
          card.style.setProperty('--reveal-delay', `${delay}ms`)
        })
    }
  }

  scan()

  // Pick up sections/cards rendered later by client-side routing.
  const root = document.getElementById('root')
  if (root && typeof MutationObserver !== 'undefined') {
    const mo = new MutationObserver(() => scan())
    mo.observe(root, { childList: true, subtree: true })
  }

  return io
}