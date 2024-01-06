import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { AppRouter } from './routes'

import './App.css'
import { persistor, store } from './store'

const App = () => (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</PersistGate>
	</Provider>
)

export default App
