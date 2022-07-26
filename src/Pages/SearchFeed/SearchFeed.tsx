import React from 'react'
import { connect } from 'react-redux'
// @ts-ignore
import FeedCard from '../../Components/FeedCard/FeedCard.tsx'
// @ts-ignore
import Loader from '../../Components/Loader/Loader.tsx'
// @ts-ignore
import ErrorPage from '../Error/ErrorPage.tsx'

import './SearchFeed.css'


function SearchFeed({searchData}) {
    const search : object[]  = searchData.reducer.search
    console.log(searchData.reducer)
  return (
    <div className='searchFeed'>
    {searchData.reducer.loading ?
        <div className="loader"> <Loader /> </div> : 
        searchData.reducer.error ? 
       (<ErrorPage error = {searchData.reducer.error} search = {true} />):
       searchData.reducer.search.length > 0 ?
       <div>
     { search.map((image, i) => (
        <FeedCard image = {image} key = {i} /> 
      ))}
    </div>
       : <p>Please type some shit</p>
       }
       </div>
  )
}

const mapStateToProps = state =>{

    return{
        searchData: state
    }
    
}

export default connect(mapStateToProps)(SearchFeed)