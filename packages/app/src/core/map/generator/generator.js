
import FastSimplexNoise from 'fast-simplex-noise'

import { generateTile, tileTypes } from './tiles'
import { applyRivers } from './riverGenerator'
import { applyTileEntities } from './entityGenerator'

/**
 * Tile type is for plains, hills and mountains are dictated only by elevation
 */
const getTileType = (t, p, e) => {
  if (e > 0.75) {
    return tileTypes[0]
  }

  if (e > 0.5) {
    return tileTypes[1]
  }

  return tileTypes[2]
}

/**
 * Temperature is affected by base temp and elevation.
 * Elevation is the key driver, base temp adds _flavour_ to temperature range
 * of a specific tile.
 */
const calculateTemperature = (elevation, baseTemp) => {
  return ((1 - elevation) * 0.65) + (baseTemp * 0.35)
}

/**
 * Generates the core map data
 */
export const generateMap = props => {
  const [w, h] = props.size

  const temperatureData = new FastSimplexNoise({
    max: 1,
    min: 0,
    octaves: 4,
    frequency: 0.1,
    amplitude: 1
  })
  const precipitationData = new FastSimplexNoise({
    max: 1,
    min: 0,
    octaves: 4,
    frequency: 0.18,
    amplitude: 1,
    persistence: 0.1
  })
  const elevationData = new FastSimplexNoise({
    max: 1,
    min: 0,
    octaves: 8,
    frequency: 0.15,
    amplitude: 0.9,
    persistence: 0.1
  })

  let data = []

  for (let y = 0; y < h; y++) {
    let row = []

    for (let x = 0; x < w; x++) {
      const characteristics = {
        temperature: calculateTemperature(
          elevationData.scaled([x, y]),
          temperatureData.scaled([x, y])
        ),
        precipitation: precipitationData.scaled([x, y]),
        elevation: elevationData.scaled([x, y])
      }
      const tile = generateTile({
        ...characteristics,
        type: getTileType(
          characteristics.temperature,
          characteristics.precipitation,
          characteristics.elevation
        )
      })

      row.push(tile)
    }

    data.push(row)
  }

  data = applyRivers(data, props.riverFrequency.value)
  data = applyTileEntities(data, props)

  return data
}
