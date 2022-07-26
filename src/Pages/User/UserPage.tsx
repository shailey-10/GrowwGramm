import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import './UserPage.css'
import {FaMapMarker, FaList} from 'react-icons/fa'
import {BsFillGrid3X3GapFill} from 'react-icons/bs'
// @ts-ignore
import Feed from '../../Components/Feed/Feed.tsx';
// @ts-ignore
import Loader from '../../Components/Loader/Loader.tsx'
// @ts-ignore
import GridFeed from '../../Components/GridFeed/GridFeed.tsx';
// @ts-ignore
import useFetch from '../../Hooks/useFetch.tsx';
// @ts-ignore
import ErrorPage from '../Error/ErrorPage.tsx';

function UserPage() {

  const apiRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;
  let {id} = useParams();

  if(id === undefined){
    // @ts-ignore
    id = localStorage.getItem('user')
    console.log(localStorage.getItem('user'))
  }else{
    console.log('url')
  }

  const pageNumber = 1;

  const [page, setPage] = useState(pageNumber);

  const [gridView, setGridView] = useState(false)

  const {data : userPosts, error, loading, refetch, currentUser : user} = useFetch(`${apiRoot}/users/${id}/photos?client_id=${accessKey}&per_page=30&page=${page}`, true, `${apiRoot}/users/${id}?client_id=${accessKey}`);

    window.onscroll = function(){
      if(
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight - 0.5
      ){
          scrollToEnd()
          console.log('in')
        }
      }
    
  
    const scrollToEnd = () => {
        setPage(page+1)
        if(Math.ceil(user.total_photos / 30) - 1 > page && page > 1)
        if(Math.ceil(user.total_photos / 30) - 1 === page){
        refetch(`${apiRoot}/users/${id}/photos?client_id=${accessKey}&per_page=30&page=${page}`, false)
        }else{
          const noPosts = user.total_photos % 30;
          refetch(`${apiRoot}/users/${id}/photos?client_id=${accessKey}&per_page=${noPosts}&page=${page}`, false)
        }
    }

    
    useEffect(() => {
        // fetchPosts();
        // @ts-ignore
        localStorage.setItem('user', id)
        console.log(user)
    }, [])
    useEffect(() => {
      console.log(page)
     
    }, [page])

    
  return (
   
    <div>
    { error ? <ErrorPage error = {error} /> :  id === "null" ? <h3>No recent user, view some profiles!</h3> :
    <>
    <div className='profile'>
  
        <div className="image">
        {user.profile_image ?<img src = {user.profile_image.large} alt = "profile" /> : null}
        </div>
        <div className="userInfo">
        <p className='username'>{id}</p>
        <div className="numbers">
        <p> <span className='data'> {user.total_photos} </span> Posts</p>
        <p>  <span className='data'>{user.followers_count} </span> Followers</p>
        <p>  <span className='data'>{user.following_count}  </span>Following</p>
        </div>
        <div className="text">
        <p className='name'>{user.name}</p>
        <p>{user.bio}</p>
        <p><FaMapMarker />  {user.location}</p>
        </div>
        </div>
    </div>

    <div>
      <div className='views'>
      <FaList onClick={() => {setGridView(false)}} />
      <BsFillGrid3X3GapFill onClick={() => {setGridView(true)}} />
      
      </div>
    { userPosts ? !gridView ? 
        <Feed  posts = {userPosts} /> 
      :null : <Loader />}
      <div className="gridView">
    {gridView ? <GridFeed  posts = {userPosts} /> : null}
    {loading ? <div className="loader"> <Loader /> </div>  : null}
    </div>
    </div>

    </>
}
    </div>
     
  )
}

export default UserPage