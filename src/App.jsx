import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from './components/test/test2/Test'
import Navbar from './components/navbar/Navbar'
import Topbar from './components/topbar/Topbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Topbar/>
      <Navbar/>

    </>
  )
}

export default App
