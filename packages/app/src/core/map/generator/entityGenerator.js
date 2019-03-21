
import { random } from 'lodash/fp'
import uuid from 'uuid/v1'

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

    if (testFn(t)) {
      tile = [x, y]
    }
  }

  return tile
}

const applyEntity = (map, entities, location, type) => {
  const [x, y] = location
  const tile = map[y][x]

  if (tile.entities.length) {
    return
  }

  const id = uuid()
  entities[id] = generateTileEntity({
    type,
    position: [x, y]
  })
  tile.entities.push(id)
}

const applyVegetation = (entities, data, seedRate) => {
  const size = data.length * data[0].length

  let i = 0

  while (i++ < size * seedRate) {
    const location = getSite(data, getValidPlantSite)
    if (location) {
      applyEntity(data, entities, location, 'TEPlant')
    }
  }

  return entities
}

const applyCaves = (entities, data, freq) => {
  const size = data.length * data[0].length

  let i = 0

  while (i++ < size * freq) {
    const location = getSite(data, getValidCaveSite)
    if (location) {
      applyEntity(data, entities, location, 'TECave')
    }
  }

  return entities
}

export const applyTileEntities = (entities, map, props) => {
  const { vegetationSeedRate, caveFrequency } = props

  entities = applyVegetation(entities, map, vegetationSeedRate.value)
  entities = applyCaves(entities, map, caveFrequency.value)

  return entities
}
