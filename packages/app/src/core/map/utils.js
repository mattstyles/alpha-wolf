
import { join, map, compose } from 'lodash/fp'

export const createTo1d = width => (x, y) => (y * width) + x

export const lerp = (value, min, max) => {
  return min + ((max - min) * value)
}

export const lerpColor = (min, max) => (value) => {
  const [r1, g1, b1] = min
  const [r2, g2, b2] = max
  return [
    lerp(value, r1, r2),
    lerp(value, g1, g2),
    lerp(value, b1, b2)
  ]
}

export const toHexString = compose(
  join(''),
  map(col => col.toString(16)),
  map(_ => _ | 0)
)

export const toHex = str => parseInt(str, 16)

/**
 * @param value<float> where 0 < value <= 1
 * @returns <number> a hex value i.e. 0xFF00FF
 */
export const createColorRangeFn = (min, max) => compose(
  toHex,
  toHexString,
  lerpColor(min, max)
)
