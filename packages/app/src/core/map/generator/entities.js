
export const BaseEntity = {}

export const generateTileEntity = (props) => ({
  ...BaseEntity,
  type: 'null',
  ...props
})

export const tileEntities = {
  TEPlant: {
    frame: 6,
    minRainfall: 0.35,
    spreadRate: 0.2,
    growthRate: 0.8,
    color: 0x5E826B
  },
  TECorpse: {
    frame: 7,
    decayRate: 0.5,
    decayThreshold: 0.2,
    color: 0xE4D340
  },
  TECave: {
    frame: 5,
    color: 0xDFDDE6
  }
}
