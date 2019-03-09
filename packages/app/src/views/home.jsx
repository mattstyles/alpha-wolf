
import { createStructuredSelector } from 'reselect'
import { View, Button, FlexBox, Pane } from 'react-basic-kit'

import { connect } from 'signals'
import { push, routes } from 'core/routing'
import { generateMap } from 'core/map/actions'
import { Map } from 'components/map'
import { getMap, getMapSize } from 'core/map/selectors'

const viewSelector = createStructuredSelector({
  map: getMap,
  size: getMapSize
})

export const Home = connect(
  viewSelector,
  ({ map, size }) => (
    <View isPadded>
      <h1>Alpha Wolf</h1>
      <Pane split>
        <FlexBox width='200px'>
          <Button mb={2} primary onClick={() => generateMap()}>
            Generate Map
          </Button>
          <Button primary onClick={() => push({
            route: routes.simulation
          })}>Go to simulation</Button>
        </FlexBox>
        <FlexBox px={2}>
          <Map data={map} size={size} />
        </FlexBox>
      </Pane>
    </View>
  )
)
