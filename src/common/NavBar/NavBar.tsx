import React, {useState, useCallback} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import './NavBar.css'

import {FaHome, FaHeart, FaUserCircle, FaSearch} from 'react-icons/fa'
import { fetchSearch } from '../../redux/Search/SearchAction'
import { useEffect } from 'react'

function NavBar({fetchSearch} : {fetchSearch : any}) { 

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

    const debounce = (func: { (event: any): void; apply?: any }) => {
      let timer: string | number | NodeJS.Timeout | null | undefined;
      return function (this: unknown, ...args: any){
        const context = this;
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
          timer = null
          func.apply(context, args);
        }, 500)
      }
    }
   
    function search(event: { target: { value: any } }){
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
const mapStateToProps = (state: any) =>{
    return{
        searchData: state
    }
    
}

const mapDispatchtoProps = (dispatch : any) => {
    console.log('fetching')
    return {
        fetchSearch: (value: any) => dispatch(fetchSearch(value))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(NavBar)