import React from 'react'
import { Link } from 'react-router-dom';

import './ReccomendedUserCard.css'

function ReccomendedUserCard(user) {

    const currentUser = user.user
    let username = currentUser.username
    console.log(username)
    let bio;
    if(currentUser.bio){
    bio = currentUser.bio.slice(0,40)
    }

    return (
    <div className='userCard'>
       <Link to = {'/user/'+username}> <h2>{currentUser.name}</h2> </Link>
        <p>@{currentUser.username}</p>
        <p>{bio}</p>
        <p>Posts: {currentUser.total_photos}</p>
    </div>
  )
}

export default ReccomendedUserCard