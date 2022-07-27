import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsFeed from '../views/News Feed/NewsFeed';
import SearchFeed from '../views/SearchFeed/SearchFeed';
import UserPage from '../views/User/UserPage';
import ErrorPage from '../views/Error/ErrorPage'
import NavBar from '../common/NavBar/NavBar';



function AppRoutes() {
  return (
    
    <Router>
            <NavBar />

      <Routes>
        <Route path = '/' element = {<NewsFeed />}/>
        <Route path = '/search' element = {<SearchFeed />} />
        <Route path='/user/:id' element = {<UserPage  />} />
        <Route path = '/recentuser' element = {<UserPage fromNav={true} />} />
        <Route path='*' element = {<ErrorPage error = "Seems like you are lost, go to home page!" />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes