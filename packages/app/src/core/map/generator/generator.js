
import FastSimplexNoise from 'fast-simplex-noise'

import { generateTile, tileTypes } from './tiles'

const getTileType = (t, p, e) => {
  if (e > 0.75) {
    return tileTypes[0]
  }

  if (e > 0.5) {
    return tileTypes[1]
  }

  return tileTypes[2]
}

// @TODO
export const generateMap = props => {
  const [w, h] = props.size

  const temperatureData = new FastSimplexNoise({
    frequency: 0.01,
    max: 1,
    min: 0,
    octaves: 4,
    amplitude: 0.8
  })
  const precipitationData = new FastSimplexNoise({
    frequency: 0.01,
    max: 1,
    min: 0,
    octaves: 4,
    amplitude: 0.8
  })
  const elevationData = new FastSimplexNoise({
    max: 1,
    min: 0,
    octaves: 8,
    amplitude: 0.9,
    frequency: 0.15,
    persistence: 0.1
  })

  const data = []

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const characteristics = {
        temperature: temperatureData.scaled([x, y]),
        precipitation: precipitationData.scaled([x, y]),
        elevation: elevationData.scaled([x, y])
      }
      data.push(generateTile({
        ...characteristics,
        type: getTileType(
          characteristics.temperature,
          characteristics.precipitation,
          characteristics.elevation
        )
      }))
    }
  }

  return data
}
