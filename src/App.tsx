import './App.css';

import { Provider } from 'react-redux';
import store from './redux/Store';
import AppRoutes from './router';

function App() {

 
  return (
    <Provider store = {store} >
    <div className="App">

    <AppRoutes />
      
    </div>
    </Provider>
  );
}

export default App;
