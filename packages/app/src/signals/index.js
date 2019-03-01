
import { Signal } from 'raid'
import { adaptor } from 'raid-addons'

import { initial } from './state'

export const signal = Signal.of(initial)
export const connect = adaptor(signal)
export const dispatch = type => payload => signal.emit({ type, payload })
export const emit = (type, payload) => signal.emit({ type, payload })
