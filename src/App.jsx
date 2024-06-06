import { useState } from 'react'
import './App.css'
import LoginPage from './pages/login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/home'
import Layout from './components/layout'
import Services from './components/services'
import ServicesPage from './pages/services'
import ContactPage from './pages/contact'
import DentistPage from './pages/dentist'
import TeamPage from './pages/team'
import AppointmentPage from './pages/appointment'
import RecordPage from './pages/record'
import SignupPage from './pages/signup'


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
          path:"/services",
          element: <ServicesPage/>
        },
        {
          path:"/contact",
          element: <ContactPage/>
        },
        {
          path:"/dentist",
          element: <DentistPage/>
        },
        {
          path:"/team",
          element: <TeamPage/>
        },
        {
          path:"/appointment",
          element: <AppointmentPage/>
        },
        {
          path:"/record",
          element: <RecordPage/>
        },
      ]
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/signup",
      element: <SignupPage/>,
    },
    
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
