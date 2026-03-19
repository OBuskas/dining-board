// Mulberry32 — seeded 32-bit PRNG (deterministic)
function mulberry32(seed: number) {
  let s = seed | 0
  return function random(): number {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const BASE_SEED = 42_000
const rng = mulberry32(BASE_SEED)

/** Returns a random float in [0, 1) — deterministic */
export function random(): number {
  return rng()
}

/** Random integer in [min, max] inclusive */
export function randomInt(min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min
}

/** Random float in [min, max) */
export function randomFloat(min: number, max: number): number {
  return random() * (max - min) + min
}

/** Pick one random element from array */
export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(random() * arr.length)]
}

/** Pick one element using weighted probabilities (weights must sum to ~1) */
export function weightedPick<T>(items: readonly T[], weights: readonly number[]): T {
  const r = random()
  let cumulative = 0
  for (let i = 0; i < items.length; i++) {
    cumulative += weights[i]
    if (r < cumulative) return items[i]
  }
  return items[items.length - 1]
}

/** Shuffle array (Fisher-Yates) — returns new array */
export function shuffle<T>(arr: readonly T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Normal distribution approximation (Box-Muller) clamped to [min, max] */
export function randomNormal(mean: number, stddev: number, min: number, max: number): number {
  const u1 = random() || 0.0001
  const u2 = random()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  const value = mean + z * stddev
  return Math.max(min, Math.min(max, value))
}
