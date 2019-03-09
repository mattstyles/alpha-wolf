
export const BaseTile = {
  temperature: 0,
  precipitation: 0
}

export const generateTile = (props) => ({
  ...BaseTile,
  entities: [],
  type: 'null',
  ...props
})

export const tileTypes = [
  'TileMountain',
  'TileHills',
  'TilePlains',
  'TileRiver'
]

export const tiles = {
  TileMountain: {
    character: '^',
    colorModulation: [
      [212, 214, 224],
      [250, 251, 255]
    ]
  },
  TileHills: {
    character: '^',
    colorModulation: [
      [118, 96, 84],
      [64, 52, 38]
    ]
  },
  TilePlains: {
    character: ',',
    colorModulation: [
      [116, 172, 136],
      [94, 130, 107]
    ]
  },
  TileRiver: {
    character: '~',
    colorModulation: [
      [0, 172, 212],
      [102, 200, 230]
    ]
  }
}
