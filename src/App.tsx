import { AppRouter } from './routes'
import './App.css'
import { Container } from './layouts/container/container'
import { BrowserRouter } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <Container>
      <AppRouter/>
    </Container>
  </BrowserRouter>
)

export default App
