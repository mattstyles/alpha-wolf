
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
 * @param value <float> where 0 < value <= 1
 * @returns <number> a hex value i.e. 0xFF00FF
 */
export const createColorRangeFn = (min, max) => compose(
  toHex,
  toHexString,
  lerpColor(min, max)
)

/**
 * Used to generate a patch, checks if [x, y] is in range
 */
const getPatchTile = (data, [x, y], [w, h]) => {
  if (x < 0 || x >= w || y < 0 || y >= h) {
    return null
  }

  return data[y][x]
}

/**
 * Gets a patch of tiles based on an initial [x, y] location
 * @param data <Array<Array[Tile]>> the 2d raw map
 * @param position <Array[Number, Number]> [x, y] position to center on
 * @param dim <Array[Number, Number]> patch size. Defaults to [-1, 1], can be
 * used to alter the center.
 * @returns <Array<Array[PositionTile]>>
 */
export const getPatch = (data, position, dim = [-1, 1]) => {
  const [w, h] = [data[0].length, data.length]
  const [x, y] = position
  const [min, max] = dim

  const patch = []
  for (let i = y + min; i <= y + max; i++) {
    for (let j = x + min; j <= x + max; j++) {
      const tile = getPatchTile(data, [j, i], [w, h])
      if (tile) {
        patch.push({
          ...tile,
          x: j,
          y: i
        })
      }
    }
  }

  return patch
}
