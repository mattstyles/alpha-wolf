
import React, { useState } from 'react'
import styled from 'styled-components'

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

const Holder = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${props => props.opacity};
`

const Main = ({ data, size }) => {
  const [isHeatVisible, setIsHeatVisible] = useState(false)
  const [isRainVisible, setIsRainVisible] = useState(false)

  return (
    <Shell>
      <Map data={data} size={size} />
      {isHeatVisible && <Holder opacity={0.5}>
        <HeatMap
          data={data}
          size={size}
          colorFn={createColorRangeFn(heatRange[0], heatRange[1])}
          tileProp='temperature'
        />
      </Holder>}
      {isRainVisible && <Holder opacity={0.5}>
        <HeatMap
          data={data}
          size={size}
          colorFn={createColorRangeFn(rainRange[0], rainRange[1])}
          tileProp='precipitation'
        />
      </Holder>}
    </Shell>
  )
}

export const MainMap = connect(
  getMapView,
  Main
)
