
import { Texture, Rectangle } from 'pixi.js'
import { Stage, Container, Sprite } from '@inlet/react-pixi/dist/react-pixi.module'

import { connect } from 'signals'
import { tiles } from 'core/map/generator/tiles'
import { getMapView } from 'core/map/selectors'

import spritesheet from 'assets/map.png'

// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const TEX_SIZE = [4, 4]
const TEX_CELL_SIZE = [16, 16]
const CELL_SIZE = [16, 16]

const baseTexture = Texture.from(spritesheet)
const frames = []

for (let v = 0; v < TEX_SIZE[1]; v++) {
  for (let u = 0; u < TEX_SIZE[0]; u++) {
    frames.push(new Texture(
      baseTexture,
      new Rectangle(
        u * TEX_CELL_SIZE[0],
        v * TEX_CELL_SIZE[1],
        TEX_CELL_SIZE[0],
        TEX_CELL_SIZE[1]
      )
    ))
  }
}

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
      const i = to1d(x, y)
      const d = data[i]
      const tile = tiles[d.type]
      elems.push((
        <Sprite
          key={`tile${i}`}
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
