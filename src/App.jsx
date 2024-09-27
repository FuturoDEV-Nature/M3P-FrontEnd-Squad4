import './App.css'
import RoutesComponent from './routes/routes'
import { AuthProvider } from './context/authContext'

function App() {

  return (
    <>
      <AuthProvider>
        <RoutesComponent/>
      </AuthProvider>
    </> 
  )
}

export default App
