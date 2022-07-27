import React from 'react'

import './GridCard.css'

function GridCard(image: { images: { urls: { regular: string | undefined } } }) {
  return (
    <div className='userPost'>
    
<img src = {image.images.urls.regular} alt = "post"/>
</div>
  )
}

export default GridCard