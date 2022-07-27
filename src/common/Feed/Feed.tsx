import React from 'react'
import FeedCard from '../FeedCard/FeedCard'


function Feed(posts: { posts: any[] }) {
    console.log(posts)
  return (
        <div className="imageFeed">
      <div className="image-content">
   
        <div className='posts-container'>
         {
      posts.posts.map((image: any,i: React.Key | null | undefined)  => (
        <FeedCard image = {image} key = {i} /> 
      ))
    }
        </div>
        </div>
    </div>
  )
}

export default Feed