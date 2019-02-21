
import { View } from 'react-basic-kit'

import { push, routes } from 'core/routing'

export const Home = () => (
  <View>
    <h1>White Wolf</h1>
    <button onClick={() => push({
      route: routes.simulation
    })}>Go to simulation</button>
  </View>
)
