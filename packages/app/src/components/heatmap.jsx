
import { Stage, Container, Sprite } from '@inlet/react-pixi/dist/react-pixi.module'

import { connect } from 'signals'
import { tiles } from 'core/map/generator/tiles'
import { getMapView } from 'core/map/selectors'
import { frames } from 'core/map/texture'

const CELL_SIZE = [16, 16]

const appOpts = {
  background: 0x404040
}

const MapView = ({ data, size, to1d }) => {
  if (!data) {
    return null
  }

  const [w, h] = size
  let elems = []

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const d = data[y][x]
      const tile = tiles[d.type]
      elems.push((
        <Sprite
          key={`tile${(y * w) + x}`}
          x={x * CELL_SIZE[0]}
          y={y * CELL_SIZE[1]}
          texture={frames[tile.frame]}
          tint={tile.colorModulation[0]}
        />
      ))
    }
  }

  return (
    <Stage width={w * CELL_SIZE[0]} height={h * CELL_SIZE[1]} options={appOpts}>
      <Container>
        {elems}
      </Container>
    </Stage>
  )
}

export const Map = connect(
  getMapView,
  MapView
)
