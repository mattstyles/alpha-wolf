
import { map, join, compose } from 'lodash/fp'
import { Stage, Container, Sprite } from '@inlet/react-pixi/dist/react-pixi.module'

import { connect } from 'signals'
import { getMapView } from 'core/map/selectors'
import { frames } from 'core/map/texture'

const CELL_SIZE = [16, 16]

const appOpts = {
  background: 0x404040
}

const colorRange = [
  [78, 118, 252],
  [252, 54, 64],
  0xFB3640,
  0x4E76FC
]

const lerp = (value, min, max) => {
  return min + ((max - min) * value)
}

const lerpColor = (value, min = colorRange[0], max = colorRange[1]) => {
  const [r1, g1, b1] = min
  const [r2, g2, b2] = max
  return [
    lerp(value, r1, r2),
    lerp(value, g1, g2),
    lerp(value, b1, b2)
  ]
}

const toHexString = compose(
  join(''),
  map(col => col.toString(16)),
  map(_ => _ | 0)
)

const toHex = str => parseInt(str, 16)

/**
 * @param value<float> where 0 < value <= 1
 * @returns <number> a hex value i.e. 0xFF00FF
 */
const heatColor = compose(
  toHex,
  toHexString,
  lerpColor
)

const HeatMapView = ({ data, size }) => {
  if (!data) {
    return null
  }

  const [w, h] = size
  let elems = []

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tile = data[y][x]
      elems.push((
        <Sprite
          key={`tile${(y * w) + x}`}
          x={x * CELL_SIZE[0]}
          y={y * CELL_SIZE[1]}
          texture={frames[7]}
          tint={heatColor(tile.temperature)}
        />
      ))
    }
  }

  return (
    <div style={{ position: 'absolute', opacity: 0.5 }}>
      <Stage width={w * CELL_SIZE[0]} height={h * CELL_SIZE[1]} options={appOpts}>
        <Container>
          {elems}
        </Container>
      </Stage>
    </div>
  )
}

export const HeatMap = connect(
  getMapView,
  HeatMapView
)
