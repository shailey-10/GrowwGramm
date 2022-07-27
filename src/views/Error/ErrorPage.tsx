import React from 'react'
import './ErrorPage.css'

function ErrorPage(error : any) {
  console.log(error)
  return (
    <div className='error'>
      <div>
      <h2>Unable to complete the request</h2>
      <p>Try again in some time!</p>
      <p>{error.error}</p>
    </div>
    </div>
  )
}

export default ErrorPage