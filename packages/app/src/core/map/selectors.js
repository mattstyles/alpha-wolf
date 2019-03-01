
import { get } from 'lodash/fp'

import { KEY } from './constants'

export const getMap = get(`${KEY}.data`)
export const getMapSize = get(`${KEY}.size`)
