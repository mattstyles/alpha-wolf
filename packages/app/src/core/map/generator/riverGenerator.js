
import { random, reduce, compose } from 'lodash/fp'

import { getPatch } from '../utils'

const MAX_RIVER_LENGTH = 10
const MIN_RIVER_LENGTH = 2

/**
 * @param <Array[Tile]> 1d array of tiles to check
 * Returns [x, y] of the lowest elevation in a patch area
 */
const findLowestElevation = compose(
  tile => {
    return [tile.x, tile.y]
  },
  reduce((current, tile) => {
    if (!current || !current.elevation) {
      return tile
    }

    return tile.elevation < current.elevation
      ? tile
      : current
  }, null)
)

/**
 * Creates a source for the river.
 * Randomly picks a map location 20 times looking for a hills tile.
 * If no hill is found to begin at then null is returned.
 */
const createRoot = (data) => {
  const [w, h] = [data[0].length, data.length]

  let tile = null
  let iteration = 0

  while (!tile && iteration < 20) {
    let [x, y] = [random(0, w - 1), random(0, h - 1)]
    let t = data[y][x]
    if (t.type === 'TileHills') {
      tile = [x, y]
    }

    ++iteration
  }

  return tile
}

/**
 * Creates a chain of positions to become rivers.
 * Can return no chain, or a single length chain, or chain up to MAX_RIVER_LENGTH.
 * Rivers will form by flowing in to the adjacent tile with the lowest elevation
 * and will finish when it either reaches a local minimum or the max length.
 */
const createChain = (data) => {
  const position = createRoot(data)

  if (!position) {
    console.log('no root, hence no river')
    return null
  }

  let chain = []
  chain.push(position)

  let current = position

  for (let l = 0; l < MAX_RIVER_LENGTH; l++) {
    const patch = getPatch(data, current)
    const lowest = findLowestElevation(patch)

    if (lowest[0] !== current[0] && lowest[1] !== current[1]) {
      chain.push(lowest)
      current = lowest
    }
  }

  return chain
}

/**
 * Mutates data by adding rivers as a base tile type.
 * Rivers only spawn in hills, and there is a chance no hill will be found.
 * The algorithm will attempt to start a river MAX_RIVER_ROOTS number of times
 * but will disregard any rivers shorter than 2 in length. As there is a chance
 * no river will spawn and an additional chance it will be too short, it is
 * unlikely the algorithm will create the max possible number of rivers.
 */
export const applyRivers = (data, frequency) => {
  let chains = []
  let maxRoots = data[0].length * data.length * frequency

  // @TODO rather than MAX_RIVER_ROOTS, it could be calculated from the number
  // of tiles i.e. data.length * data.length[0] * riverPerc
  for (let i = 0; i < maxRoots; i++) {
    const chain = createChain(data)

    if (chain && chain.length >= MIN_RIVER_LENGTH) {
      chains.push(chain)
    }
  }

  // Iterate over each chain and mutate to river tiles
  if (chains.length) {
    chains.forEach(chain => {
      chain.forEach(([x, y]) => {
        data[y][x].type = 'TileRiver'
      })
    })
  }

  return data
}
