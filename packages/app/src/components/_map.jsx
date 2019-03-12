
import styled from 'styled-components'

import { tiles } from 'core/map/generator/tiles'

const get = value => props => props[value]

const TILE_CHAR_SIZE = 16
const TILE_SIZE = [14, 14]

const Tile = styled('span').attrs(({ color, x, y }) => ({
  style: {
    transform: `translate3d(${x}px, ${y}px, 0)`,
    color: `rgb(${color.join(',')})`
  }
}))`
  position: absolute;
  font-size: ${TILE_CHAR_SIZE}px;
`

const MapBack = styled('div')`
  background: rgb(23, 22, 28);
  width: ${get('w')}px;
  height: ${get('h')}px;
`

export const Map = ({ data, size }) => {
  if (!data) {
    return null
  }

  const [w, h] = size
  const to1d = (x, y) => (y * w) + x
  let elems = []
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = to1d(x, y)
      const d = data[i]
      const tile = tiles[d.type]
      elems.push((
        <Tile
          key={`tile${i}`}
          x={x * TILE_SIZE[0]}
          y={y * TILE_SIZE[1]}
          color={tile.colorModulation[0]}
        >
          {tile.character}
        </Tile>
      ))
    }
  }

  return (
    <MapBack w={w * TILE_SIZE[0]} h={h * TILE_SIZE[1] + 6}>
      {elems}
    </MapBack>
  )
}
