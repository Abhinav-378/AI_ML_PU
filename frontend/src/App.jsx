import { useState } from 'react'
import './App.css'
import NavBar from './Components/Header/NavBar'
import Emergency from './Components/Emergency'
import EmergencyForm from './Components/EmergencyForm'
function App() {
 

  return (
    <>
      <NavBar />
      {/* <Emergency /> */}
      <EmergencyForm />
    </>
  )
}

export default App
