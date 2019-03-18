
import { random } from 'lodash/fp'

import { generateTileEntity, tileEntities } from './entities'

const { TEPlant } = tileEntities

const getValidCaveSite = (tile) => {
  return tile.type === 'TileMountain'
}

const getValidPlantSite = (tile) => {
  return (tile.type === 'TilePlains' || tile.type === 'TileHills') && tile.precipitation > TEPlant.minRainfall
}

const getSite = (data, testFn, maxTries = 10) => {
  const [w, h] = [data[0].length, data.length]

  let tile = null
  let i = 0

  while (!tile && i++ < maxTries) {
    let [x, y] = [random(0, w - 1), random(0, h - 1)]
    let t = data[y][x]
    // if ((t.type === 'TilePlains' || t.type === 'TileHills') && t.precipitation > 0.25) {
    //   tile = [x, y]
    // }

    if (testFn(t)) {
      tile = [x, y]
    }
  }

  return tile
}

const applyVegetation = (data, seedRate) => {
  const size = data.length * data[0].length

  let i = 0

  while (i++ < size * seedRate) {
    const location = getSite(data, getValidPlantSite)
    if (location) {
      const [x, y] = location
      const tile = data[y][x]

      if (tile.entities.length <= 1) {
        tile.entities.push(generateTileEntity({
          type: 'TEPlant'
        }))
      }
    }
  }

  return data
}

const applyCaves = (data, freq) => {
  const size = data.length * data[0].length

  let i = 0

  while (i++ < size * freq) {
    const location = getSite(data, getValidCaveSite)
    if (location) {
      const [x, y] = location
      const tile = data[y][x]

      if (tile.entities.length <= 1) {
        tile.entities.push(generateTileEntity({
          type: 'TECave'
        }))
      }
    }
  }

  return data
}

// @TODO
// TileEntities should have their own array, it makes some sense to have
// them attached to the underlying map, but it is also quite likely to be
// easier to manage if they are just in an array of tile entities with
// location data also attached, similar to how entities would work.
export const applyTileEntities = (data, props) => {
  const { vegetationSeedRate, caveFrequency } = props

  data = applyVegetation(data, vegetationSeedRate.value)
  data = applyCaves(data, caveFrequency.value)

  return data
}
