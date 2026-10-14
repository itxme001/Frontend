/**
 * Shared motion tokens.
 *
 * Everything here is intentionally small and quiet: the skill guidance for this
 * kind of reveal is a short fade with an 8–16px offset, not a slide. Larger
 * offsets read as "slide", which is a known AI-default tell.
 */

/** Expo-out — decelerates hard, so motion settles rather than bounces. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Gentle in-out for reversible/interactive motion. */
export const EASE_SOFT = [0.23, 1, 0.32, 1] as const;

export const DURATION = {
  fast: 0.3,
  base: 0.55,
  slow: 0.8,
} as const;

/** Distance (px) for a standard vertical reveal. */
export const REVEAL_Y = 14;

/** Stagger between siblings in a group. */
export const STAGGER = 0.07;

/** Default viewport margin so elements animate slightly before entering. */
export const VIEWPORT = { once: true, margin: "-70px" } as const;
