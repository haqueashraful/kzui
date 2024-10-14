import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Shared/Header'
import MainPage from './Main-Pages/MainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Header />

      <MainPage />
      </div>
    </>
  )
}

export default App
