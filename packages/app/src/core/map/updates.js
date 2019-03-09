
import { patch, match } from 'raid-addons'

import { is } from 'utils'
import { KEY, actions } from './constants'
import { generateMap } from './generator/generator'

const updateGenerateMap = (state, event) => {
  return {
    ...state,
    data: generateMap(state)
  }
}

export const update = patch(KEY, match([
  [is(actions.generate), updateGenerateMap]
]))
