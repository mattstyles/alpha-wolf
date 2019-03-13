
import { Texture, Rectangle } from 'pixi.js'

import spritesheet from 'assets/map.png'

// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const TEX_SIZE = [4, 4]
const TEX_CELL_SIZE = [16, 16]

export const baseTexture = Texture.from(spritesheet)
export const frames = []

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
