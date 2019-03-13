
import { get } from 'lodash/fp'
import { createSelector } from 'reselect'

import { KEY } from './constants'
import { createTo1d } from './utils'

export const getMap = get(`${KEY}.data`)
export const getMapSize = get(`${KEY}.size`)
export const getMapProperties = get(`${KEY}`)

export const getMapView = createSelector(
  getMap,
  getMapSize,
  (data, size) => ({
    data,
    size,
    to1d: createTo1d(size[0])
  })
)
