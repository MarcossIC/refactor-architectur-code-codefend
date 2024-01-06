import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { store, persistor } from './data/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Loader } from './views/components'
import { AppRouter } from './Router'


export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <AppRouter />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}
