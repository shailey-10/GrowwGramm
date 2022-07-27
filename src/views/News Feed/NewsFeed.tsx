import React, { useState } from "react";
import Loader from "../../common/Loader/Loader";
import ReccomendedUserCard from "../../common/ReccomendedUserCard/ReccomendedUserCard";

import './NewsFeed.css'
import Feed from "../../common/Feed/Feed";
import useFetch from "../../utils/hooks/useFetch";
import ErrorPage from "../Error/ErrorPage";



function NewsFeed() {

  const apiRoot = "https://api.unsplash.com";
  const accessKey = process.env.REACT_APP_ACCESSKEY;

  const pageNumber = 1;
  const [page, setPage] = useState(pageNumber);

  const {data : posts, error, loading, refetch, collections, collectionPhotos} = useFetch(`${apiRoot}/photos/random?client_id=${accessKey}&count=10`,false, '',  `${apiRoot}/collections?client_id=${accessKey}&page=${Math.floor( Math.random() * ( 1 + 100 - 1 ) ) + 1}&per_page=6` );

  
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
   
      { error ?  <ErrorPage error = {error.message} /> : 
      <>
      {loading ? <div className="loader"> <Loader /> </div> : null}
      <div className="collections">
        {collections?.length > 0 ? collections.map((collection: { id: any; cover_photo: { urls: { thumb: string | undefined; }; }; title: string | any[]; }, i: React.Key | null | undefined) => (
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
      posts.slice(0,6).map((post: { user: any; }, i: any) => (
        <ReccomendedUserCard user = {post.user} key = {i}  /> 
      ))
    }</div>
    </div> 
    </>
}
</div>)
}

export default NewsFeed;
