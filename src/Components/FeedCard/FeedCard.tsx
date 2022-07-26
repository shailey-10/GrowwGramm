import React from 'react'
import './FeedCard.css'
import { Link } from 'react-router-dom'
import {FaRegBookmark} from 'react-icons/fa'

function FeedCard({image}) {


  return (
    <div className='post'>
            <div className="location">
        {/* <p>{image.location.city}</p> */}
        </div>
        <img src = {image.urls.regular} alt = "post"/>
        <div className="action-container">
        <div className="likes">
        <p>{image.likes} Likes</p>
        <FaRegBookmark />
        </div>
       
       <div className="user">
        <img src={image.user.profile_image.small} alt="" />
        <div className="content">
        <p  className='name'><Link  to = {'/user/' + image.user.username}>{image.user.username} </Link><span className='desc'>{image.description}</span></p> 
        </div>
        </div>
        <div className="date">
        <p>{image.created_at.slice(0, 10)}</p>
        </div>
        </div>
    </div>
  )
}




export default FeedCard