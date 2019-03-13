
import { Stage, Container, Sprite } from '@inlet/react-pixi/dist/react-pixi.module'

import { frames } from 'core/map/texture'

const CELL_SIZE = [16, 16]

const appOpts = {
  background: 0x404040
}

export const HeatMap = ({ data, size, colorFn, tileProp }) => {
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
          tint={colorFn(tile[tileProp])}
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
