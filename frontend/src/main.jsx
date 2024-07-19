import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Layout from './Components/Layout.jsx'
import Emergency from './Components/Emergency.jsx'
import EmergencyForm from './Components/EmergencyForm.jsx'
import Diagnosis from './Components/Diagnosis.jsx'
import CalorieIntakePlan from './Components/CalorieIntakePlan.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout/>,
    children:[
      {
        path:"",
        element: <Emergency/>
      },
      {
        path:"sosrequest",
        element: <EmergencyForm/>
      },
      {
        path:"diagnosis",
        element: <Diagnosis/>
      },
      {
        path:"calories",
        element: <CalorieIntakePlan/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
