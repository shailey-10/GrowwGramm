import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './Components/NavBar/NavBar.tsx';
import NewsFeed from './Pages/News Feed/NewsFeed.tsx';
import ErrorPage from './Pages/Error/ErrorPage.tsx';
import SearchFeed from './Pages/SearchFeed/SearchFeed.tsx';
import { Provider } from 'react-redux';
import store from './Redux/Store.tsx';
import UserPage from './Pages/User/UserPage.tsx';

function App() {

 
  return (
    <Provider store = {store} >
    <div className="App">
   
      <Router>
      <NavBar />
     
        <Routes>
          <Route path = '/' element = {<NewsFeed />}/>
          <Route path = '/search' element = {<SearchFeed />} />
          <Route path='/user/:id' element = {<UserPage />} />
          <Route path = '/recentuser' element = {<UserPage fromNav = {true} />} />
          <Route path='*' element = {<ErrorPage />} />
        </Routes>
      </Router>
      
    </div>
    </Provider>
  );
}

export default App;
