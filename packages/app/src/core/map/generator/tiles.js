
export const BaseTile = {
  temperature: 0,
  precipitation: 0,
  elevation: 0
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
      0xFAFBFF,
      0xD4D6E0,
      [250, 251, 255],
      [212, 214, 224]
    ],
    frame: 0
  },
  TileHills: {
    character: '^',
    colorModulation: [
      0x765E56,
      0x403426,
      [118, 96, 84],
      [64, 52, 38]
    ],
    frame: 0
  },
  TilePlains: {
    character: ',',
    colorModulation: [
      0x75AD8A,
      0x5E826B,
      [116, 172, 136],
      [94, 130, 107]
    ],
    frame: 2
  },
  TileRiver: {
    character: '~',
    colorModulation: [
      0x01ABD5,
      0x66C9E6,
      [0, 172, 212],
      [102, 200, 230]
    ],
    frame: 1
  }
}
