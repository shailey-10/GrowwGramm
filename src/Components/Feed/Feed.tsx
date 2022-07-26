import React from 'react'
// @ts-ignore
import FeedCard from '../FeedCard/FeedCard.tsx'


function Feed(posts) {
    console.log(posts)
  return (
        <div className="imageFeed">
      <div className="image-content">
   
        <div className='posts-container'>
         {
      posts.posts.map((image,i)  => (
        <FeedCard image = {image} key = {i} /> 
      ))
    }
        </div>
        </div>
    </div>
  )
}

export default Feed