import React, {useState, useCallback} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import './NavBar.css'

import {FaHome, FaHeart, FaUserCircle, FaSearch} from 'react-icons/fa'
// @ts-ignore
import { fetchSearch } from '../../Redux/Search/SearchAction.tsx'
import { useEffect } from 'react'


function NavBar({searchData, fetchSearch}) { 

  const [searchBar, setSearchbar] = useState(false);
  

  const location = useLocation();


  useEffect(() => {
    console.log(location)
    if(location.pathname === "/search"){
      setSearchbar(true)
    }else{
      setSearchbar(false)
    }
  }, [location])

    const debounce = (func) => {
      let timer;
      return function (...args){
        const context = this;
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          timer = null
          func.apply(context, args);
        }, 500)
      }
    }
   
    function search(event){
      fetchSearch(event.target.value)
    }

  

    const optimizedVersion = useCallback(debounce(search), [])
  return (<>
    <div className='nav'>
        <div className="logo">
           <Link to = '/'> <img src="./images/logo.png" alt="" /> </Link>
        </div>
        <div className="search">
           <Link className='searchBar' to = '/search'> <input type="text" placeholder='search' onChange={optimizedVersion} /> </Link>
        </div>
        <div className="actions">
        <Link to = '/'> <FaHome /> </Link>
            <FaHeart />
            <Link to = '/recentUser'> <FaUserCircle /> </Link>
            <Link to = '/search'> <FaSearch  /> </Link>
        </div>
    </div>
   { searchBar ? <div className="search-mobile">
           <Link className='searchBar-mobile' to = '/search'> <input type="text" placeholder='search' onChange={optimizedVersion} /> </Link>
        </div> : null}
    </>
  )

 
}
const mapStateToProps = state =>{
    return{
        searchData: state
    }
    
}

const mapDispatchtoProps = dispatch => {
    console.log('fetching')
    return {
        fetchSearch: (value) => dispatch(fetchSearch(value))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(NavBar)