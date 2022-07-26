import React, { useState } from "react";
// @ts-ignore
import Loader from "../../Components/Loader/Loader.tsx";
// @ts-ignore
import ReccomendedUserCard from "../../Components/ReccomendedUserCard/ReccomendedUserCard.tsx";

import './NewsFeed.css'
// @ts-ignore
import Feed from "../../Components/Feed/Feed.tsx";
// @ts-ignore
import useFetch from "../../Hooks/useFetch.tsx";
// @ts-ignore
import ErrorPage from "../Error/ErrorPage.tsx";



function NewsFeed() {

  const apiRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  const pageNumber = 1;
  const [page, setPage] = useState(pageNumber);

  const {data : posts, error, loading, refetch, collections, collectionPhotos} = useFetch(`${apiRoot}/photos/random?client_id=${accessKey}&count=10`,false, null,  `${apiRoot}/collections?client_id=${accessKey}&page=${Math.floor( Math.random() * ( 1 + 100 - 1 ) ) + 1}&per_page=6` );

  
  window.onscroll = function(){
    if(
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight - 0.5
    ){
        scrollToEnd()}
    }
  

  const scrollToEnd = () => {
    refetch(`${apiRoot}/photos/random?client_id=${accessKey}&count=10`, false)
      setPage(page + 1)
  }



  
  return (<div className="home">
   
      { error ?  <ErrorPage error = {error} /> : 
      <>
      <div className="collections">
        {collections?.length > 0 ? collections.map((collection, i) => (
          <div key={i} className="collection" onClick={() => collectionPhotos(`${apiRoot}/collections/${collection.id}/photos?client_id=${accessKey}&per_page=30`)}>
            <img src={collection.cover_photo.urls.thumb} alt="" />
            <p>{collection.title.slice(0, 5)}..</p>
            </div>
        )): null}
      </div>

      
        <div className="homeContainer">
          <div>
      {posts?.length > 0 ? <Feed  posts = {posts} /> : null }
      {loading ? <div className="loader"> <Loader /> </div> : null}
      </div>
    <div className="users">
    { posts.length>0 ?  <h2>Users You Might Like</h2> : null}
    {
      posts.slice(0,6).map((post, i) => (
        <ReccomendedUserCard user = {post.user} key = {i} /> 
      ))
    }</div>
    </div> 
    </>
}
</div>)
}

export default NewsFeed;
