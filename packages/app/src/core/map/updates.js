
import { patch, match } from 'raid-addons'

import { KEY, actions } from './constants'

const is = type => event => event.type === type

const generateMap = (state, event) => {
  return {
    ...state,
    data: Math.random()
  }
}

export const update = patch(KEY, match([
  [is(actions.generate), generateMap]
]))
