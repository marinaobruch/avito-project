import { AppRouter } from './routes'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
      <AppRouter/>
  </BrowserRouter>
)

export default App
