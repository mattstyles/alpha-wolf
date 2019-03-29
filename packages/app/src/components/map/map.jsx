
import { Stage, Container, Sprite } from '@inlet/react-pixi/dist/react-pixi.module'

import { tileEntities } from 'core/map/generator/entities'
import { tiles } from 'core/map/generator/tiles'
import { frames } from 'core/map/texture'
// import { createColorRangeFn } from 'core/map/utils'

const CELL_SIZE = [16, 16]

const appOpts = {
  background: 0x404040
}

const getEntitySprite = (entity) => {
  const base = tileEntities[entity.type]
  const [x, y] = entity.position

  return (
    <Sprite
      key={`entity[${x}:${y}]`}
      x={x * CELL_SIZE[0]}
      y={y * CELL_SIZE[1]}
      texture={frames[base.frame]}
      tint={base.color}
      scale={1}
    />
  )
}

const getTileSprite = (tile, x, y) => {
  const base = tiles[tile.type]

  // const color = createColorRangeFn(
  //   base.colorModulation[2],
  //   base.colorModulation[3]
  // )(tile.elevation)

  // Interpolating by elevation isn't super useful, for example, mountains only
  // range in elevation between 0.75 and 1.0, so we'd have to normalise based
  // on tile elevation rules.
  const color = base.colorModulation[0]

  return (
    <Sprite
      key={`tile[${x}:${y}]`}
      x={x * CELL_SIZE[0]}
      y={y * CELL_SIZE[1]}
      texture={frames[base.frame]}
      tint={color}
      scale={1}
    />
  )
}

export const Map = ({ data, size, entities }) => {
  if (!data) {
    return null
  }

  const [w, h] = size
  // @TODO is allocating in the render func a good idea, vs manually
  // deleting an arrays items?
  let elems = []

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tile = data[y][x]
      elems.push(getTileSprite(tile, x, y))
    }
  }

  for (let id in entities) {
    elems.push(getEntitySprite(entities[id]))
  }

  return (
    <Stage width={w * CELL_SIZE[0]} height={h * CELL_SIZE[1]} options={appOpts}>
      <Container>
        {elems}
      </Container>
    </Stage>
  )
}
