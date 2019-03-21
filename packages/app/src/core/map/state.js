
import { KEY, MAP_SIZE } from './constants'
import { params } from './generator/traits'

export const initialState = {
  [KEY]: {
    data: null,
    size: MAP_SIZE,
    entities: {},
    ...params
  }
}
