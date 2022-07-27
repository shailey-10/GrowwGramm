import React from 'react'
import { connect, useSelector } from 'react-redux'

import FeedCard from '../../common/FeedCard/FeedCard'

import Loader from '../../common/Loader/Loader'

import ErrorPage from '../Error/ErrorPage'

import './SearchFeed.css'


function SearchFeed({searchData} : {searchData : any}) {
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

const mapStateToProps = (state : any) =>{

    return{
        searchData: state
    }
    
}

export default connect(mapStateToProps)(SearchFeed)