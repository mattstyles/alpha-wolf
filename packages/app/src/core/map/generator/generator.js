
import { random } from 'lodash/fp'

import { generateTile, tileTypes } from './tiles'

const tempGetRandomTile = () => ({
  type: tileTypes[random(0, tileTypes.length - 1)]
})

// @TODO
export const generateMap = props => {
  const [w, h] = props.size
  const len = w * h
  return Array.from(Array(len), _ => {
    const type = tempGetRandomTile()
    return generateTile({
      ...type
    })
  })
}
