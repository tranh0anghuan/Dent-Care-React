import { useState } from 'react'
import './App.css'
import LoginPage from './pages/login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home'
import Layout from './components/layout'


function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path:"/",
          element: <HomePage/>
        },
        {
          path:"contact",
          element:"contact"
        },


      ]
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
