import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TraerPersonas from './components/TraerPersonas'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>Lista de Personas</h1>
      <TraerPersonas />
    </div>
  )
}

export default App
