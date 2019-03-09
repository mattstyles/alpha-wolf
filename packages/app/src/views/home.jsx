
import { View, Button, FlexBox } from 'react-basic-kit'

import { connect } from 'signals'
import { push, routes } from 'core/routing'
import { generateMap } from 'core/map/actions'
import { Map } from 'components/map'

export const Home = connect(
  state => state.map,
  (map) => (
    <View isPadded>
      <h1>Alpha Wolf</h1>
      <FlexBox width='200px'>
        <Button mb={2} primary onClick={() => generateMap()}>
          Generate Map
        </Button>
        <Button primary onClick={() => push({
          route: routes.simulation
        })}>Go to simulation</Button>
      </FlexBox>
      <FlexBox>
        <Map data={map.data} size={map.size} />
      </FlexBox>
    </View>
  )
)
