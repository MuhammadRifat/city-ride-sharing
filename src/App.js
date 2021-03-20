import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import SearchResult from './components/SearchResult/SearchResult';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <PrivateRoute path="/destination/:vehicle">
            <Destination/>
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <PrivateRoute path="/search-result">
            <SearchResult/>
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
    </userContext.Provider>
  );
}

export default App;
