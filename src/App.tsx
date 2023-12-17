import { AppRouter } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import './App.css'
import { store, persistor } from './store'

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

export default App;
