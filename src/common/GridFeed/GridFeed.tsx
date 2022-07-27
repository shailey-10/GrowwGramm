import React from 'react'
// @ts-ignore

import GridCard from '../GridCard/GridCard.tsx'

function GridFeed(posts: { posts: any[] }) {
    console.log(posts)
  return (
    <>
    {
        posts.posts.map((image: any , i: React.Key | null | undefined) => (
         <GridCard images = {image} key = {i}/>
        ))
      }
      </>
  )
}

export default GridFeed