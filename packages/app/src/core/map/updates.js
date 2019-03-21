
import { patch, match } from 'raid-addons'

import { is } from 'utils'
import { KEY, actions } from './constants'
import { generate } from './generator/generator'

const updateGenerateWorld = (state, event) => {
  return {
    ...state,
    ...generate(state)
  }
}

export const update = patch(KEY, match([
  [is(actions.generate), updateGenerateWorld]
]))
