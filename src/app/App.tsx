import { BrowserRouter } from 'react-router-dom'
import { AppDataProvider } from '../contexts/AppDataContext'
import AppRouter from '../routes/AppRouter'

export default function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <AppRouter />
      </AppDataProvider>
    </BrowserRouter>
  )
}
