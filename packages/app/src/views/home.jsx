
import { View, Button, FlexBox } from 'react-basic-kit'

import { push, routes } from 'core/routing'
import { generateMap } from 'core/map/actions'

export const Home = () => (
  <View isPadded>
    <h1>Alpha Wolf</h1>
    <FlexBox width='200px'>
      <Button mb={2} primary onClick={generateMap}>
        Generate Map
      </Button>
      <Button primary onClick={() => push({
        route: routes.simulation
      })}>Go to simulation</Button>
    </FlexBox>
  </View>
)
