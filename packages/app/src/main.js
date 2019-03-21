
import { render } from 'react-dom'
import { debug } from 'raid-addons'

import { signal } from 'signals'
import { App } from 'components/app'
import { Navigation } from 'components/navigation'

import { update as mapUpdate } from 'core/map/updates'

if (process.env.DEBUG) {
  signal.register(debug('>>'))
}

const el = document.querySelector('.js-main')

signal.register(mapUpdate)

if (process.env.DEBUG) {
  signal.register(debug('<<'))
}

signal.observe(state => {
  render(
    <App>
      <Navigation navigation={state.navigation} />
    </App>,
    el
  )
}, err => console.error(err))

if (module.hot) {
  module.hot.dispose(() => {
    console.group('[HMR] dispose')
    console.log('disposing signal updates')

    signal.disposeAll()
    signal.observers = []

    console.groupEnd('[HMR] dispose')
  })
  module.hot.accept(() => {
    console.group('[HMR] accept')
    // attachUpdates()
    signal.emit({
      hmr: 'accept'
    })
    console.groupEnd('[HMR] accept')
  })
}
