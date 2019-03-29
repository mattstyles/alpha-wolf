
import { get } from 'lodash/fp'
import { createStructuredSelector } from 'reselect'

import { KEY } from './constants'

export const getMap = get(`${KEY}.data`)
export const getMapSize = get(`${KEY}.size`)
export const getMapProperties = get(`${KEY}`)
export const getEntities = get(`${KEY}.entities`)

export const getMapView = createStructuredSelector({
  data: getMap,
  size: getMapSize,
  entities: getEntities
})
