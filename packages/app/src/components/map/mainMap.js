
import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Box } from 'react-basic-kit'

import { connect } from 'signals'
import { getMapView } from 'core/map/selectors'
import { Map } from './map'
import { HeatMap } from './heatmap'
import { createColorRangeFn } from 'core/map/utils'

const heatRange = [
  [78, 118, 252],
  [252, 54, 64]
]

const rainRange = [
  [138, 254, 252],
  [218, 42, 44]
]

const Shell = styled('div')`
  position: relative;
`

const Overlay = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => props.opacity};
`

// @TODO this could be way more efficient, it doesn't need several canvasses to
// show overlays
const Main = ({ data, size }) => {
  if (!data) {
    return null
  }

  const [isHeatVisible, setIsHeatVisible] = useState(false)
  const [isRainVisible, setIsRainVisible] = useState(false)

  return (
    <>
      <Shell>
        <Map data={data} size={size} />
        {isHeatVisible && <Overlay opacity={0.5}>
          <HeatMap
            data={data}
            size={size}
            colorFn={createColorRangeFn(heatRange[0], heatRange[1])}
            tileProp='temperature'
          />
        </Overlay>}
        {isRainVisible && <Overlay opacity={0.5}>
          <HeatMap
            data={data}
            size={size}
            colorFn={createColorRangeFn(rainRange[0], rainRange[1])}
            tileProp='precipitation'
          />
        </Overlay>}
      </Shell>
      <Box>
        <Box my={1} width={200}>
          <Button fit onClick={() => setIsHeatVisible(!isHeatVisible)}>
            {`${isHeatVisible ? 'Hide' : 'Show'} temperature`}
          </Button>
        </Box>
        <Box my={1} width={200}>
          <Button fit onClick={() => setIsRainVisible(!isRainVisible)}>
            {`${isRainVisible ? 'Hide' : 'Show'} rainfall`}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export const MainMap = connect(
  getMapView,
  Main
)
