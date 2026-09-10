import Lenis from 'lenis'

// Centralized smooth-scroll manager built on Lenis.
//
// Lenis is the global scrolling foundation: it smooths native wheel/trackpad
// scroll on the window and powers programmatic scrolls. It runs on native
// scroll (no transforms/overflow wrappers on the app), so position:sticky
// (sticky header + product gallery), modals, the cart drawer, mega menu and
// forms keep behaving normally. UI animations (hover, cards, mega menu,
// scroll-reveal) remain CSS/React-driven and are intentionally separate.
//
// Reduced motion is honored by the library by default (see
// `respectReducedMotion`): smoothing is disabled and programmatic scrolls jump
// instantly — matching the user's `prefers-reduced-motion` setting.

let lenis = null

// Matches the product sections' `scroll-mt-24` sticky-header clearance and the
// navbar height, so anchored sections land just below the sticky header.
const STICKY_OFFSET = 96

export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    autoRaf: true,
    // Premium but responsive programmatic scroll (~400ms ease-out-cubic).
    duration: 0.4,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    // Wheel/trackpad smoothing (default 0.1 keeps it fluid without delay).
    lerp: 0.1,
    smoothWheel: true,
    // Keep native touch scrolling 1:1 for mobile responsiveness.
    syncTouch: false,
    // Enable anchor links with sticky-header offset for scroll-to-section.
    anchors: { offset: STICKY_OFFSET },
    // Stop leftover inertia when an in-app link is clicked (React Router).
    stopInertiaOnNavigate: true,
    // Let nested/overflow scrollables (cart drawer, horizontal rail) scroll
    // natively instead of smooth-scrolling them.
    prevent: (node) =>
      !!(
        node &&
        node.closest &&
        node.closest(
          '[data-lenis-prevent], [data-lenis-prevent-vertical], [data-lenis-prevent-horizontal]'
        )
      ),
    // Honor prefers-reduced-motion.
    respectReducedMotion: true,
  })

  return lenis
}

export function getLenis() {
  return lenis
}

function currentY() {
  return (
    window.scrollY ||
    window.scrollTop ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

// Smoothly scroll a section/element into view below the sticky header.
// The target's own scroll-margin-top is honored when present.
export function scrollToSection(id, offset) {
  const el = document.getElementById(id)
  if (!el) return

  const margin = parseFloat(getComputedStyle(el).scrollMarginTop || '0') || 0
  const targetOffset = offset ?? (margin || STICKY_OFFSET)

  if (lenis) {
    lenis.scrollTo(el, { offset: targetOffset, duration: 0.4 })
  } else {
    // Fallback if Lenis failed to initialize.
    const target = Math.max(0, el.getBoundingClientRect().top + currentY() - targetOffset)
    window.scrollTo({ top: target, behavior: 'smooth' })
  }
}

// Scroll back to the top. Pass { immediate: true } to jump instantly
// (used on route changes). Reduced-motion is handled by Lenis.
export function scrollToTop({ immediate } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: !!immediate })
  } else {
    window.scrollTo({
      top: 0,
      behavior: immediate ? 'auto' : 'smooth',
    })
  }
}