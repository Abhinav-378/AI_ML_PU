import React from 'react'
import {Link} from 'react-router-dom'
function Emergency() {
  return (
    <div>
      <div className='w-[70vw] mx-auto my-3'>
        <div className='flex flex-col h-[70vh] justify-center items-center gap-5'>
            <h1 className='text-6xl font-bold text-white text-center leading-snug'>Securing Medical Emergency by booking an <span className='text-6xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 bg-clip-text text-transparent'> Ambulance</span></h1>
            <p className='text-xl text-gray-300 my-3'>In urgent medical emergency, Book emergency services</p>
            <button className="btn bg-red-500 text-white shadow-lg border-0 shadow-red-500/50">
              <Link to='/sosrequest'>
                SOS / Emergency Button
              </Link>
              </button>
        </div>
      </div>
    </div>
  )
}

export default Emergency
