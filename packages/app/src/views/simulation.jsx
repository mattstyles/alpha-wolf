
import { View } from 'react-basic-kit'

import { pop } from 'core/routing'

export const Simulation = () => (
  <View>
    <h1>Simulating...</h1>
    <button onClick={() => pop()}>Back</button>
  </View>
)
