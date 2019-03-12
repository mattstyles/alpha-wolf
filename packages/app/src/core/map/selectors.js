
import { get } from 'lodash/fp'
import { createSelector } from 'reselect'

import { KEY } from './constants'

export const getMap = get(`${KEY}.data`)
export const getMapSize = get(`${KEY}.size`)
export const getMapProperties = get(`${KEY}`)

export const getMapView = createSelector(
  getMap,
  getMapSize,
  (data, size) => ({
    data,
    size,
    to1d: (x, y) => (y * size[0]) + x
  })
)
