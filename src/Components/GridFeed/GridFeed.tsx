import React from 'react'
// @ts-ignore

import GridCard from '../GridCard/GridCard.tsx'

function GridFeed(posts) {
    console.log(posts)
  return (
    <>
    {
        posts.posts.map((image , i) => (
         <GridCard images = {image} key = {i}/>
        ))
      }
      </>
  )
}

export default GridFeed